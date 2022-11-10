import { Operation } from "./Operation";

export class Path {

    operations: Operations;

    constructor() {
        this.operations = { };
    }

    getOperations(): Operations { return this.operations; }

    setoperations(operations: Operations): Path { this.operations = operations; return this; }

    addOperation(operationType: string, operation: Operation): Path {
        this.operations[operationType.toLowerCase() as keyof Operations] = operation;
        return this;
    }
}

interface Operations {
    name?: Operation
}