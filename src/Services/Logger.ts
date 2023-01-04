import { ILogObject, Logger } from "tslog";
import { Config } from "~/config/Config";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { createStream } from "rotating-file-stream";

const stream = createStream(path.join(Config.Logger.file.path, Config.Logger.file.name), Config.Logger.file.options)

function logToFile(logObject: ILogObject) {
    let logLevel = logObject.logLevel.toUpperCase() + " ".repeat(5 - logObject.logLevel.length);
    let logDateFormatted = logObject.date.toISOString();
    let loggerName = logObject.loggerName;
    let messageElements : string[] = [];
    logObject.argumentsArray.forEach((item :any) => {
        if(typeof item === 'object') {
            messageElements.push(JSON.stringify(item))
        }
        messageElements.push(item);
    });
    let logMessage = messageElements.join(', ');
    const log = `${logDateFormatted} ${logLevel} [${loggerName}] ${logMessage}`;

    if(Config.Logger.doAppendToFile) {
        if(!existsSync(Config.Logger.file.path)) {
            mkdirSync(path.resolve(Config.Logger.file.path), { recursive: true });
        }
        stream.write(`${log}\n`);
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