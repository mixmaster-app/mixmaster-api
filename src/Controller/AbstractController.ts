import { Express, NextFunction, Request, Response } from "express";
import { Controller } from "~/Utils/Controller";

export abstract class AbstractController {

    app: Express;
    swaggerTagName: string;

    constructor(app: Express) {
        this.app = app;
        this.swaggerTagName = this.constructor.name.replace("Controller", "")
        console.log(`Init new ${ this.constructor.name }`);
    }

    abstract getController(): Controller;
}