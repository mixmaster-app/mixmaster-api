import express, { Express, json, NextFunction, Request, Response, Router, urlencoded } from "express";
import cors from "cors";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { Route } from "../Utils/Route";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerGenerator } from "./SwaggerGenerator";
import { log } from "./Logger";
import { HTTPStatus } from "~/Utils/HTTPStatus";

export const DEFAULT_ERROR = { error: "Internal server error" };

export class APIManager {

    port : number;
    app: Express;
    routerApiV1: Router;
    routes : Array<Route> = [];
    swaggerGenerator: SwaggerGenerator;

    constructor( { port: port = 3000 } ) {
        this.port = port;
        this.swaggerGenerator = new SwaggerGenerator();
    }

    /**
     * Init the API
     */
    init(): void {
        const options: cors.CorsOptions = {
              allowedHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                    'X-Access-Token',
                    'Authorization'
                ],
                credentials: true,
                methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
                origin: '*',
                preflightContinue: false,
        };

        this.app = express();
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());
        this.app.use(cors(options));

        this.routerApiV1 = express.Router();
        this.app.listen(this.port, () => {
            log.info(`Server running on port ${ this.port }`);
        });
    }

    /**
     * Register every route saved
     * Add an handler for every unknow routes
     */
    run(): void {
        this.registerSwagger();
        this.app.use("/api", this.routerApiV1);
        this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
            return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).json(DEFAULT_ERROR);
        })
    }

    /**
     * Add a controller to the API
     * @param controller
     */
    addController(controller: Controller): void {
        controller.getRoutes().forEach( (route: Route) => {
            this.registerRouteInApiV1(route)
        });
        this.swaggerGenerator.addController(controller);
    }

    addControllers(controllers: Array<Controller>): void {
        controllers.forEach( (controller: Controller) => {
            this.addController(controller);
        })
    }

    /**
     * Register a new route in the API
     * @param route
     */
    registerRouteInApiV1(route: Route): void {
        switch(route.getType()) {
            case HTTPRequest.GET:
                this.routerApiV1.get(`${route.getRoute()}`, (req: Request, res: Response, next: NextFunction) => {
                    try {
                        // TODO: depending on the route and authorization, enable it or not
                        log.debug(`Request from : ${req.headers.authorization}`);
                        return route.callback(req, res, next);
                    } catch(error) {
                        log.error(`Error on route ${route.getRoute()}`, error);
                        return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).send(DEFAULT_ERROR);
                    }
                });
                break;
            case HTTPRequest.EXPOSE:
                this.routerApiV1.use(`${route.getRoute()}`, express.static(`${route.callback()}`));
                break;
            default:
                log.warn(`Unsupported route type ${ route.getType() } for route ${ route.getRoute() }`);
                break;
        }
    }

    /**
     * Register the swagger informations about the API
     */
    registerSwagger(): void {
        // console.log(this.swaggerGenerator.build());
        const specs = swaggerJsdoc({
            definition: this.swaggerGenerator.build(),
            apis: []
        });
        this.routerApiV1.use("/swagger.json", (req, res, next) => {
            return res.send(specs);
        });
        this.routerApiV1.use(
            "/swagger",
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
    }

    /**
     * Return the Express application
     * @returns
     */
    getApp(): Express { return this.app; }
}