import { Paths } from "swagger-jsdoc";
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
            .setTitle("mixmaster-api")
            .setVersion("1.0.0")
            .setDescription("API of the game mixmaster <a href='https://mixmaster-online.fr'>https://mixmaster-online.fr</a>");
        this.openapi = "3.0.0";
        this.servers = [];
        this.servers.push(
            (new Server())
                .setUrl("/")
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

    addPath(pathname: string, path: Path): Swagger {
        this.paths[pathname] = path.getOperations();
        return this;
    }

    addTag(tag: Tag): Swagger {
        this.tags.push(tag);
        return this;
    }

}