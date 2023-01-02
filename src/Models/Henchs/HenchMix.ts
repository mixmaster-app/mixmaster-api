import { DataTypes } from "sequelize";
import { Database } from "~/Services/DatabaseAccess";
import { DefaultOptions } from "../AbstractModel";

const sequelize = (new Database()).getDb();

export const HenchMix = sequelize.define("HenchMix",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hench_result_id: {
            type: DataTypes.INTEGER,
        }
    }, {
        ...DefaultOptions,
        tableName: "hench_mix"
    }
);