import { Express, NextFunction, Request, Response } from "express";
import { ZoneDAO } from "~/Data/ZoneDAO";
import { DEFAULT_ERROR } from "~/Services/APIManager";
import { log } from "~/Services/Logger";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { HTTPStatus } from "~/Utils/HTTPStatus";
import { Route } from "~/Utils/Route";
import { AbstractController } from "./AbstractController";

const DESCRIPTION = "Get informations about henchs";
export class ZoneController extends AbstractController {

    constructor(app: Express) {
        super(app);
    }

    getController(): Controller {
        this.controller.setDescription(DESCRIPTION);
        this.controller.addRoutes([
            new Route({
                'label': "GetAll",
                'description': "Get every zones",
                'type': HTTPRequest.GET,
                'route': "/zones",
                'pathname': "/zones",
                'callback': this.getAll
            })
        ]);
        return this.controller;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        log.info(`Get every zones, ${req.url}`);
        try {
            return res.json(await ZoneDAO.findAll());
        } catch(e) {
            log.error(`Error while requesting every zones, ${req.url}`);
            log.error(e);
            return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).send(DEFAULT_ERROR);
        }
    }
}