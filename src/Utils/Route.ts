import { AbstractUtils } from "./AbstractUtils";
import { HTTPRequest } from "./HTTPRequest";

export class Route extends AbstractUtils {
    
    label: string;
    description: string;
    type: string;
    route: string;
    callback: Function;

    constructor(
        params : {
            label: string,
            description: string,
            type: HTTPRequest,
            route: string,
            callback: Function
        }
    ) {
        super();
        this.label = params.label;
        this.description = params.description;
        this.type = params.type;
        if(!params.type) {
            this.type = HTTPRequest.GET;
        }
        this.route = params.route;
        this.callback = params.callback;
    }

    getLabel(): string { return this.label; }
    getDescription(): string { return this.description; }
    getType(): string { return this.type; }
    getRoute(): string { return this.route; }
    getCallback(): Function { return this.callback; }

    setLabel(label: string) {  this.label = label; return this; }
    setDescription(description: string) {  this.description = description; return this; }
    setType(type: string) {  this.type = type; return this; }
    setRoute(route: string) {  this.route = route; return this; }
    setCallback(callback: Function) {  this.callback = callback; return this; }
}