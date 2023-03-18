import { Express, NextFunction, Request, Response } from "express";
import { HenchDAO } from "~/Data/HenchDAO";
import { Hench } from "~/Models/Henchs/Hench";
import { HenchMix } from "~/Models/Henchs/HenchMix";
import { HenchStats } from "~/Models/Henchs/HenchStats";
import { HenchType } from "~/Models/Henchs/HenchType";
import { Item } from "~/Models/Item";
import { Zone } from "~/Models/Zone";
import { log } from "~/Services/Logger";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { Route } from "~/Utils/Route";
import { AbstractController } from "./AbstractController";


export class TestController extends AbstractController {

    constructor(app: Express) {
        super(app);
    }

    getController(): Controller {
        this.controller.addRoutes([
            new Route({
                'label': "test",
                'description': "Test route",
                'type': HTTPRequest.GET,
                'route': "/test",
                'pathname': "/test",
                'callback': this.test
            })
        ]);
        return this.controller;
    }

    async test(req: Request, res: Response, next: NextFunction) {
        log.debug("Test route");
        let id: number = 850;
        let result = await HenchDAO.findEvolutionsOfHench(id);

        return res.json(result);
    }
}