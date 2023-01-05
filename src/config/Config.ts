import { Dialect } from "sequelize";

export const Config = {
    API : {
        port: 3000,
        name: "mixmaster-api",
        description: "API of the game mixmaster <a href='https://mixmaster-online.fr'>https://mixmaster-online.fr</a>",
        version: "1.4.1",
        openapi: "3.0.0",
    },
    Logger: {
        datePattern: "year-month-day hour:minute:second",
        doAppendToFile: true,
        file: {
            path: "./",
            name: "mixapi.log",
            options: {
                maxSize: "25M",
                maxFiles: 3,
                interval: "7d",
                compress: "gzip",
                path: "./var/logs"
            }
        }
    },
    Database: {
        type: "mysql" as Dialect,
        host: "localhost",
        port: "3306",
        database: "mixmaster_db",
        user: "root",
        password: "root",
        isLoggingEnabled: false
    }
}