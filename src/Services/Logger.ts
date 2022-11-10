import { ILogObject, Logger } from "tslog";
import { config } from "~/config/Config";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

function logToFile(logObject: ILogObject) {
    if(config.Logger.doAppendToFile) {
        if(!existsSync(config.Logger.logPath)) {
            mkdirSync(path.resolve(config.Logger.logPath), { recursive: true });
        }
        appendFileSync(path.join(config.Logger.logPath, config.Logger.filename), `${JSON.stringify(logObject)}\n`);
    }
}

export const log: Logger = new Logger({
    name: "mixmaster-api",
    displayLoggerName: true,
    displayRequestId: false,
    displayFunctionName: false,
    displayFilePath: "hidden",
    dateTimePattern: config.Logger.datePattern
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