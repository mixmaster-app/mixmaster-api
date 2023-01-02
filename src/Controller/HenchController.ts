import { Express, NextFunction, Request, Response } from "express";
import { HenchDAO } from "~/Data/HenchDAO";
import { DEFAULT_ERROR } from "~/Services/APIManager";
import { log } from "~/Services/Logger";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { HTTPStatus } from "~/Utils/HTTPStatus";
import { Route } from "~/Utils/Route";
import { AbstractController } from "./AbstractController";

const DESCRIPTION = "Get informations about henchs";
export class HenchController extends AbstractController {

    constructor(app: Express) {
        super(app);
    }

    getController(): Controller {
        this.controller.setDescription(DESCRIPTION);
        this.controller.addRoutes([
            new Route({
                'label': "GetAll",
                'description': "Get every henchs",
                'type': HTTPRequest.GET,
                'route': "/henchs",
                'callback': this.getAll
            }),
            new Route({
                'label': "GetOneById",
                'description': "Get one hench by its id",
                'type': HTTPRequest.GET,
                'route': "/hench/:id",
                'callback': this.getOneById
            }),
            new Route({
                'label': "Search",
                'description': "Search henchs by name",
                'type': HTTPRequest.GET,
                'route': "/hench/search/:search",
                'callback': this.search
            }),
            new Route({
                'label': "GetEvolutionsOfHenchById",
                'description': "Get every evolutions of a hench by its id",
                'type': HTTPRequest.GET,
                'route': "/hench/:id/evolutions",
                'callback': this.getEvolutionsOfHenchById
            }),
            new Route({
                'label': "GetMixOfHenchById",
                'description': "Get every mixs of a hench by its id",
                'type': HTTPRequest.GET,
                'route': "/hench/:id/mixs",
                'callback': this.getMixOfHenchById
            })
        ]);
        return this.controller;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        log.info(`Get every henchs, ${req.url}`);
        try {
            let limit: number = parseInt(req.query.limit?.toString() ?? "");
            return res.json(await HenchDAO.findAll( limit ));
        } catch(e) {
            log.error(`Error while requesting every henchs, ${req.url}`);
            log.error(e);
            return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).send(DEFAULT_ERROR);
        }
    }

    async search(req: Request, res: Response, next: NextFunction) {
        log.info(`Search henchs by name, ${req.url}`);
        try {
            let limit: number = parseInt(req.query.limit?.toString() ?? "");
            let search: string = req.params.search?.toString() ?? "";
            return res.json(await HenchDAO.searchByName( search, limit ));
        } catch(e) {
            log.error(`Error while requesting henchs by name, ${req.url}`);
            log.error(e);
            return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).send(DEFAULT_ERROR);
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        log.info(`Get one hench by its id, ${req.url}`);
        try {
            return res.json(await HenchDAO.findOneById( parseInt(req.params.id) ));
        } catch(e) {
            log.error(`Error while requesting one hench by its id, ${req.url}`);
            log.error(e);
            return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).send(DEFAULT_ERROR);
        }
    }

    async getEvolutionsOfHenchById(req: Request, res: Response, next: NextFunction) {
        log.info(`Get every evolutions of a hench by its id, ${req.url}`);
        try {
            return res.json(await HenchDAO.findEvolutionsOfHench( parseInt(req.params.id) ));
        } catch(e) {
            log.error(`Error while requesting every evolutions of a hench by its id, ${req.url}`);
            log.error(e);
            return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).send(DEFAULT_ERROR);
        }
    }

    async getMixOfHenchById(req: Request, res: Response, next: NextFunction) {
        log.info(`Get every mix of a hench by its id, ${req.url}`);
        try {
            return res.json(await HenchDAO.findMixOfHench( parseInt(req.params.id) ));
        } catch(e) {
            log.error(`Error while requesting every mix of a hench by its id, ${req.url}`);
            log.error(e);
            return res.status(HTTPStatus._500_INTERNAL_SERVER_ERROR).send(DEFAULT_ERROR);
        }
    }
}