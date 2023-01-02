import { DataTypes } from "sequelize";
import { Database } from "~/Services/DatabaseAccess";
import { DefaultOptions } from "./AbstractModel";

const sequelize = (new Database()).getDb();

export const Zone = sequelize.define("Zone",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        ...DefaultOptions,
        tableName: "zone"
    }
);