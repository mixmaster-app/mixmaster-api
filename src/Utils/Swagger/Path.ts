import { Operation } from "./Operation";

export class Path {

    operations: Operations;

    constructor() {
        this.operations = { };
    }

    getOperations(): Operations { return this.operations; }

    setoperations(operations: Operations): Path { this.operations = operations; return this; }

    addOperation(operationType: string, operation: Operation): Path {
        this.operations[operationType] = operation;
        return this;
    }
}

export interface Operations {
    [key: string]: Operation
}

export interface Paths {
    [key: string]: Path;
}