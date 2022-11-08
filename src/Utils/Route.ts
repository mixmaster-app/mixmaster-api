import { AbstractUtils } from "./AbstractUtils";
import { HTTPRequest } from "./HTTPRequest";

export class Route extends AbstractUtils {
    
    label: string|undefined;
    description: string|undefined;
    type: string|undefined;
    route: string|undefined;
    callback: Function;

    constructor(
        params : {
            label: string | undefined,
            description: string | undefined,
            type: HTTPRequest | undefined,
            route: string | undefined,
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

    getLabel(): string|undefined { return this.label; }
    getDescription(): string|undefined { return this.description; }
    getType(): string|undefined { return this.type; }
    getRoute(): string|undefined { return this.route; }
    getCallback(): Function { return this.callback; }

    setLabel(label: string|undefined) {  this.label = label; return this; }
    setDescription(description: string|undefined) {  this.description = description; return this; }
    setType(type: string|undefined) {  this.type = type; return this; }
    setRoute(route: string|undefined) {  this.route = route; return this; }
    setCallback(callback: Function) {  this.callback = callback; return this; }
}