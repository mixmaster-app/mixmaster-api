import { Express, NextFunction, Request, Response } from "express";
import { Controller } from "~/Utils/Controller";

export abstract class AbstractController {

    app: Express;

    constructor(app: Express) {
        this.app = app;
        console.log(`Init new ${ this.constructor.name }`);
    }

    abstract getController(): Controller;
}