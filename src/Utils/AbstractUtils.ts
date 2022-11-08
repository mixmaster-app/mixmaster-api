export abstract class AbstractUtils {

    constructor() { }

    toJson() {
        return JSON.stringify(this, null, 4);
    }
    
}