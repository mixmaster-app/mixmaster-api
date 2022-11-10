import { Controller } from "~/Utils/Controller";
import { Route } from "~/Utils/Route";
import { Swagger } from "~/Utils/Swagger";
import { ControllerToTag } from "./Transformer/ControllerTransformer";
import { RouteToPath } from "./Transformer/RouteTransformer";

export class SwaggerGenerator {

    swagger: Swagger;

    constructor()  {
        this.swagger = new Swagger();
    }

    build(): Swagger {
        return this.swagger;
    }

    addController(controller: Controller): SwaggerGenerator {
        const tag = ControllerToTag(controller);
        this.swagger.addTag(tag);
        controller.getRoutes().forEach( (route: Route) => {
            this.swagger.addPath(route, RouteToPath(route, tag.getName()));
        })
        return this;
    }

}