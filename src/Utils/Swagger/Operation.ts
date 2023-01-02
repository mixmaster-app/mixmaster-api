import { Parameter } from "./Parameter";

export class Operation {

    tags: Array<String>;
    summary: string;
    description: string;
    operationId: string;
    responses: Array<any>;
    parameters: Array<Parameter>;

    constructor() {
        this.tags = [];
        this.responses = [];
        this.parameters = [];
    }

    getTags(): Array<String> { return this.tags; }
    getSummary(): string { return this.summary; }
    getDescription(): string { return this.description; }
    getOperationId(): string { return this.operationId; }
    getResponses(): Array<any> { return this.responses; }
    getParameters(): Array<Parameter> { return this.parameters; }

    setTags(tags: Array<String>): Operation { this.tags = tags; return this; }
    setSummary(summary: string): Operation { this.summary = summary; return this; }
    setDescription(description: string): Operation { this.description = description; return this; }
    setOperationId(operationId: string): Operation { this.operationId = operationId; return this; }
    setResponses(responses: Array<any>) : Operation { this.responses = responses; return this; }
    setParameters(parameters: Array<Parameter>): Operation { this.parameters = parameters; return this; }

    addtag(tag: string): Operation {
        this.tags.push(tag);
        return this;
    }

    addResponses(response: any): Operation {
        this.responses.push(response);
        return this;
    }

    addParameter(parameter: Parameter): Operation {
        this.parameters.push(parameter);
        return this;
    }
}