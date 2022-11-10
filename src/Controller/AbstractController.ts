import { Express } from "express";
import { log } from "~/Services/Logger";
import { Controller } from "~/Utils/Controller";

export abstract class AbstractController {

    app: Express;
    swaggerTagName: string;

    constructor(app: Express) {
        this.app = app;
        this.swaggerTagName = this.constructor.name.replace("Controller", "")
        log.info(`Init new ${ this.constructor.name }`);
    }

    abstract getController(): Controller;
}