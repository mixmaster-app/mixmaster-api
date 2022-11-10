import express, { Express, json, NextFunction, Request, Response, Router, urlencoded } from "express";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { Route } from "../Utils/Route";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerGenerator } from "./SwaggerGenerator";
import { log } from "./Logger";

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
        this.app = express();
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());

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
            return res.status(500).json({ 'error': "Internal error" });
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

    /**
     * Register a new route in the API
     * @param route
     */
    registerRouteInApiV1(route: Route): void {
        switch(route.getType()) {
            case HTTPRequest.GET:
                this.routerApiV1.get(`${route.getRoute()}`, (req: Request, res: Response, next: NextFunction) => {
                    return route.callback(req, res, next);
                });
                break;
            case HTTPRequest.PUT:
                this.routerApiV1.put(`${route.getRoute()}`, (req: Request, res: Response, next: NextFunction) => {
                    return route.callback(req, res, next);
                });
                break;
            case HTTPRequest.POST:
                this.routerApiV1.post(`${route.getRoute()}`, (req: Request, res: Response, next: NextFunction) => {
                    return route.callback(req, res, next);
                });
                break;
            case HTTPRequest.DELETE:
                this.routerApiV1.delete(`${route.getRoute()}`, (req: Request, res: Response, next: NextFunction) => {
                    return route.callback(req, res, next);
                });
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