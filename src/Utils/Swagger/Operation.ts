import { Parameter } from "./Parameter";

export class Operation {

    tags: Array<String>;
    summary: string;
    description: string;
    operationId: string;
    parameters: Array<Parameter>;

    constructor() {
        this.tags = [];
        this.parameters = [];
    }

    getTags(): Array<String> { return this.tags; }
    getSummary(): string { return this.summary; }
    getDescription(): string { return this.description; }
    getOperationId(): string { return this.operationId; }
    getParameters(): Array<Parameter> { return this.parameters; }

    setTags(tags: Array<String>): Operation { this.tags = tags; return this; }
    setSummary(summary: string): Operation { this.summary = summary; return this; }
    setDescription(description: string): Operation { this.description = description; return this; }
    setOperationId(operationId: string): Operation { this.operationId = operationId; return this; }
    setParameters(parameters: Array<Parameter>): Operation { this.parameters = parameters; return this; }

    addtag(tag: string): Operation {
        this.tags.push(tag);
        return this;
    }

    addParameter(parameter: Parameter): Operation {
        this.parameters.push(parameter);
        return this;
    }
}