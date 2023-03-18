import { AbstractUtils } from "./AbstractUtils";
import { HTTPRequest } from "./HTTPRequest";
import { Parameter } from "./Swagger/Parameter";

export class Route extends AbstractUtils {
    
    label: string;
    description: string;
    type: string;
    route: string;
    pathname: string;
    parameters: Array<Parameter>;
    callback: Function;

    constructor(
        params : {
            label: string,
            description: string,
            type: HTTPRequest,
            route: string,
            pathname: string,
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
        this.pathname = params.pathname;
        this.callback = params.callback;
        this.parameters = [];
    }

    getLabel(): string { return this.label; }
    getDescription(): string { return this.description; }
    getType(): string { return this.type; }
    getRoute(): string { return this.route; }
    getPathname() : string { return this.pathname; }
    getCallback(): Function { return this.callback; }
    getParameters() : Array<Parameter> { return this.parameters; }

    setLabel(label: string) {  this.label = label; return this; }
    setDescription(description: string) {  this.description = description; return this; }
    setType(type: string) {  this.type = type; return this; }
    setRoute(route: string) {  this.route = route; return this; }
    setPathname(pathname: string) { this.pathname = pathname; return this; }
    setCallback(callback: Function) {  this.callback = callback; return this; }

    addParameter(param: Parameter) {
        this.parameters.push(param);
        return this;
    }

    addParameters(params: Array<Parameter>) {
        params.forEach(item => this.addParameter(item));
        return this;
    }
}