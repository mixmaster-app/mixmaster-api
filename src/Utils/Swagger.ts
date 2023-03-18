import { Paths } from "swagger-jsdoc";
import { Config } from "~/config/Config";
import { Route } from "./Route";
import { ExternalDocumentation } from "./Swagger/ExternalDocumentation";
import { Info } from "./Swagger/Info";
import { Path } from "./Swagger/Path";
import { Server } from "./Swagger/Server";
import { Tag } from "./Swagger/Tag";

/**
 * https://swagger.io/specification/
 */
export class Swagger {

    openapi: string;
    info: Info;
    servers: Array<Server>;
    paths: Paths;
    tags: Array<Tag>;
    externalDocs: ExternalDocumentation;

    constructor() {
        this.info = (new Info())
            .setTitle(Config.API.name)
            .setVersion(Config.API.version)
            .setDescription(Config.API.description);
        this.openapi = Config.API.openapi;
        this.servers = [];
        this.servers.push(
            (new Server())
                .setUrl("http://127.0.0.1:3000/api")
                .setDescription("")
        );
        this.tags = [];
        this.paths = { };
    }

    getOpenapi(): string { return this.openapi; }
    getInfo(): Info { return this.info; }
    getServers(): Array<Server> { return this.servers; }
    getPaths(): Paths { return this.paths; }
    getTags(): Array<Tag> { return this.tags; }
    getExternalDocs(): ExternalDocumentation { return this.externalDocs; }

    setOpenapi(openapi: string): Swagger { this.openapi = openapi; return this; }
    setInfo(info: Info): Swagger { this.info = info; return this; }
    setServers(servers: Array<Server>): Swagger { this.servers = servers; return this; }
    setPaths(paths: Paths): Swagger { this.paths = paths; return this; }
    setTags(tags: Array<Tag>): Swagger { this.tags = tags; return this; }
    setExternalDocs(externalDocs: ExternalDocumentation): Swagger { this.externalDocs = externalDocs; return this; }

    addPath(route: Route, path: Path): Swagger {
        const pathname = route.getPathname();
        const routeType = route.getType();

        if(!this.paths[pathname]) {
            this.paths[pathname] = path.getOperations();
        } else {
            this.paths[pathname][routeType] = path.getOperations()[routeType];
        }
        return this;
    }

    addTag(tag: Tag): Swagger {
        this.tags.push(tag);
        return this;
    }

}