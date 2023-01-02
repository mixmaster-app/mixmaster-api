import { ILogObject, Logger } from "tslog";
import { Config } from "~/config/Config";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

function logToFile(logObject: ILogObject) {
    if(Config.Logger.doAppendToFile) {
        if(!existsSync(Config.Logger.logPath)) {
            mkdirSync(path.resolve(Config.Logger.logPath), { recursive: true });
        }
        appendFileSync(path.join(Config.Logger.logPath, Config.Logger.filename), `${JSON.stringify(logObject)}\n`);
    }
}

export const log: Logger = new Logger({
    name: "mixmaster-api",
    displayLoggerName: true,
    displayRequestId: false,
    displayFunctionName: false,
    displayFilePath: "hidden",
    dateTimePattern: Config.Logger.datePattern,
    maskPlaceholder: "*****"
});

log.attachTransport(
    {
        silly: logToFile,
        debug: logToFile,
        trace: logToFile,
        info: logToFile,
        warn: logToFile,
        error: logToFile,
        fatal: logToFile,
    }
)