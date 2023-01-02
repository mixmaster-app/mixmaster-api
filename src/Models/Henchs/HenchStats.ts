import { DataTypes } from "sequelize";
import { Database } from "~/Services/DatabaseAccess";
import { DefaultOptions } from "../AbstractModel";
import { Hench } from "./Hench";

const sequelize = (new Database()).getDb();

export const HenchStats = sequelize.define("HenchStats",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
        },
        mp: {
            type: DataTypes.INTEGER,
        },
        attack: {
            type: DataTypes.STRING,
        },
        power: {
            type: DataTypes.INTEGER,
        },
        speed: {
            type: DataTypes.INTEGER,
        },
        accuracy: {
            type: DataTypes.INTEGER,
        },
        chance: {
            type: DataTypes.INTEGER,
        },
    }, {
        ...DefaultOptions,
        tableName: "hench"
    }
);