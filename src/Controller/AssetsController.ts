import { Express } from "express";
import { log } from "~/Services/Logger";
import { Controller } from "~/Utils/Controller";
import { HTTPRequest } from "~/Utils/HTTPRequest";
import { Route } from "~/Utils/Route";
import { AbstractController } from "./AbstractController";

export class AssetsController extends AbstractController {

    constructor(app: Express) {
        super(app);
    }

    getController(): Controller {
        this.controller.setDescription("");
        this.controller.addRoutes([
            new Route({
                'label': "getAssets",
                'description': "Access assets",
                'type': HTTPRequest.EXPOSE,
                'route': "/assets",
                'callback': this.getAssetsFolder
            })
        ]);
        return this.controller;
    }

    getAssetsFolder() {
        return `${__dirname}\\..\\..\\public\\assets`;
    }
}