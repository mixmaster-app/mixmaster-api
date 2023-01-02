import { DataTypes } from "sequelize";
import { Database } from "~/Services/DatabaseAccess";
import { DefaultOptions } from "../AbstractModel";
import { Zone } from "../Zone";
import { Hench } from "./Hench";

const sequelize = (new Database()).getDb();

export const HenchByZone = sequelize.define("HenchByZone",
    {
        zone_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hench_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        ...DefaultOptions,
        tableName: "hench_zone"
    }
);