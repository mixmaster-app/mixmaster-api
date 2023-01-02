import { Sequelize } from "sequelize";
import { Config } from "~/config/Config";

export class Database {

    base: Sequelize;

    constructor() {
        this.connect();
    }

    async connect() {
        this.base = new Sequelize(Config.Database.database, Config.Database.user, Config.Database.password, {
            host: Config.Database.host,
            dialect: Config.Database.type,
            logging: Config.Database.isLoggingEnabled
        })
    }

    getDb(): Sequelize {
        return this.base;
    }
}