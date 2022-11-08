import express, { Express, NextFunction, Request, Response } from "express";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { Route } from "../Utils/Route";

export class APIManager {

    port : number;
    app: Express;
    swagger : string|undefined;
    routes : Array<Route> = [];

    constructor( { port: port = 3000 } ) {
        this.port = port;
    }

    init() {
        this.app = express();
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }

    registerEveryUnknownRoutes() {
        this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
            return res.status(500).json({ 'error': "Internal error" });
        })
    }

    addController(controller: Controller) {
        controller.getRoutes().forEach( (route: Route) => {
            this.registerRoute(route)
        });
    }

    registerRoute(route: Route) {
        console.log(`Register new route: ${route.toJson()}`);
        switch(route.getType()) {
            case HTTPRequest.GET:
                this.app.get(`${route.getRoute()}`, (req: Request, res: Response, next: NextFunction) => {
                    return route.callback(req, res, next);
                })
                break;
            case HTTPRequest.PUT:
                throw new Error("PUT Routes not handled");
                break;
            case HTTPRequest.POST:
                throw new Error("POST Routes not handled");
                break;
            case HTTPRequest.DELETE:
                throw new Error("DELETE Routes not handled");
                break;
        }
    }

    getApp() { return this.app; }
}