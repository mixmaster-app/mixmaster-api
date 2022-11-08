import { Route } from "./Route";

export class Controller {

    name: string;
    routes: Array<Route>;

    constructor(name: string) {
        this.name = name;
        this.routes = [];
    }

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