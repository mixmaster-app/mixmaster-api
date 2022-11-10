export class Info {

    title: string;
    version: string;
    description: string;

    constructor() { }

    getTitle(): string { return this.title; }
    getVersion(): string { return this.version; }
    getDescription(): string { return this.description; }

    setTitle(title: string): Info { this.title = title; return this; }
    setVersion(version: string): Info { this.version = version; return this; }
    setDescription(description: string): Info { this.description = description; return this; }
}