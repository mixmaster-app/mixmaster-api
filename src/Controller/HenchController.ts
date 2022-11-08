import { Express, NextFunction, Request, Response } from "express";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { Route } from "~/Utils/Route";
import { AbstractController } from "./AbstractController";

export class HenchController extends AbstractController {

    constructor(app: Express) {
        super(app);
    }

    getController(): Controller {
        const henchController = new Controller(this.constructor.name);
        henchController.addRoutes([
            new Route({
                'label': "GetAll",
                'description': "Get every henchs",
                'type': HTTPRequest.GET,
                'route': "/henchs",
                'callback': this.getAll
            })
        ]);
        return henchController;
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        console.log("Get every henchs");
        return res.json(["A", "B"]);
    }
}