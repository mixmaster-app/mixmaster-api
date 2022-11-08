import express, { Express, NextFunction, Request, Response, Router } from "express";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { Route } from "../Utils/Route";

export class APIManager {

    port : number;
    app: Express;
    routerApiV1: Router;
    routes : Array<Route> = [];

    constructor( { port: port = 3000 } ) {
        this.port = port;
    }

    init() {
        this.app = express();
        this.routerApiV1 = express.Router();
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }

    appRegisterBuild() {
        this.app.use("/api", this.routerApiV1);
        this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
            return res.status(500).json({ 'error': "Internal error" });
        })
    }

    addController(controller: Controller) {
        controller.getRoutes().forEach( (route: Route) => {
            this.registerRouteInApiV1(route)
        });
    }

    registerRouteInApiV1(route: Route) {
        console.log(`Register new route: ${route.toJson()}`);
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

    getApp() { return this.app; }
}