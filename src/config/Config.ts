export const config = {
    API : {
        port: 3000
    },
    Logger: {
        datePattern: "year-month-day hour:minute:second",
        doAppendToFile: true,
        logPath: "./var/logs/",
        filename: "logs.txt"
    }
}