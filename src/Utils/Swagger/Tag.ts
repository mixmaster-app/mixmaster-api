export class Tag {

    name: string;
    description: string;

    constructor() { }

    getName(): string { return this.name; }
    getDescription(): string { return this.description; }

    setName(name: string): Tag { this.name = name; return this; }
    setDescription(description: string): Tag { this.description = description; return this; }
}