import { Route } from "./Route";

export class Controller {

    name: string;
    description: string;
    routes: Array<Route>;

    constructor(name: string, description: string = "") {
        this.name = name;
        this.description = description;
        this.routes = [];
    }

    getName(): string { return this.name; }
    getDescription(): string { return this.description; }
    getRoutes(): Array<Route> { return this.routes; }

    setRoutes(routes: Array<Route>): Controller { this.routes = routes; return this; }

    addRoutes(routes: Array<Route>): Array<Route> {
        this.routes = [...this.routes, ...routes];
        return this.routes;
    }

    addRoute(route: Route): Array<Route> {
        this.routes.push(route);
        return this.routes;
    }
}