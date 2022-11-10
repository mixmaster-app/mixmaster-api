export class ExternalDocumentation {

    description: string;
    url: string;

    constructor() { }

    getDescription(): string { return this.description; }
    getUrl(): string { return this.url; }

    setDescription(description: string): ExternalDocumentation { this.description = description; return this; }
    setUrl(url: string): ExternalDocumentation { this.url = url; return this; }
}