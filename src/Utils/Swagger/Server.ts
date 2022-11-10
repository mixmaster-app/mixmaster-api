export class Server {

    url: string;
    description: string;

    constructor() { }

    getUrl(): string { return this.url; }
    getDescription(): string { return this.description; }

    setUrl(url: string): Server { this.url = url; return this; }
    setDescription(description: string): Server { this.description = description; return this; }
}