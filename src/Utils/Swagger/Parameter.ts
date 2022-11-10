export class Parameter {
    
    name: string;
    in: string;
    required: boolean;
    description: string;

    getName(): string { return this.name; }
    getIn(): string { return this.in; }
    getRequired(): boolean { return this.required; }
    getDescription(): string { return this.description; }

    setName(name: string): Parameter { this.name = name; return this; }
    setIn(emplacement: string): Parameter { this.in = emplacement; return this; }
    setRequired(required: boolean): Parameter { this.required = required; return this; }
    setDescription(description: string): Parameter { this.description = description; return this; }
}