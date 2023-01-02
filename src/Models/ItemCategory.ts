import { DataTypes } from "sequelize";
import { Database } from "~/Services/DatabaseAccess";
import { DefaultOptions } from "./AbstractModel";

const sequelize = (new Database()).getDb();

export const ItemCategory = sequelize.define("ItemCategory",
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
        tableName: "item_category"
    }
);