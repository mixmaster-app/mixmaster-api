import { DataTypes } from "sequelize";
import { Database } from "~/Services/DatabaseAccess";
import { DefaultOptions } from "../AbstractModel";
import { HenchByZone } from "./HenchByZone";
import { Zone } from "../Zone";
import { HenchType } from "./HenchType";
import { HenchStats } from "./HenchStats";
import { HenchMix } from "./HenchMix";
import { Item } from "../Item";

const sequelize = (new Database()).getDb();

export const Hench = sequelize.define("Hench",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        img_url: {
            type: DataTypes.STRING
        },
        minimum_level: {
            type: DataTypes.INTEGER
        },
        maximum_level: {
            type: DataTypes.INTEGER
        },
        atk_type: {
            type: DataTypes.ENUM,
            values: ["1", "2", "3"]
        },
        is_dropable: {
            type: DataTypes.BOOLEAN
        },
        is_mixable: {
            type: DataTypes.BOOLEAN
        },
        is_questable: {
            type: DataTypes.BOOLEAN
        },
    }, {
        ...DefaultOptions,
        tableName: "hench"
    }
);

// Zone
Zone.belongsToMany( Hench, {
    through: HenchByZone,
    as : "henchs"
});

Hench.belongsToMany( Zone, {
    through: HenchByZone,
    as: "zones"
});

// Type
Hench.belongsTo( HenchType, {
    foreignKey: "type_id",
    as: "type"
});

// Stats
Hench.belongsTo( HenchStats, {
    foreignKey: "id",
    as: "stats"
});

// Evolutions
HenchMix.hasOne( Hench, {
    sourceKey: "hench_result_id",
    foreignKey: "id",
    as: "hench_result"
});
// -- left
Hench.hasMany( HenchMix, {
    foreignKey: "hench_left_id",
    as: "evolutions_left"
});

HenchMix.hasOne( Hench, {
    sourceKey: "hench_left_id",
    foreignKey: "id",
    as: "hench_left"
});

Item.hasMany( HenchMix, {
    foreignKey: "item_left_id",
    as: "item_left"
});

HenchMix.hasOne( Item, {
    sourceKey: "item_left_id",
    foreignKey: "id",
    as: "item_left"
});

// -- right
Hench.hasMany( HenchMix, {
    foreignKey: "hench_right_id",
    as: "evolutions_right"
});

HenchMix.hasOne( Hench, {
    sourceKey: "hench_right_id",
    foreignKey: "id",
    as: "hench_right"
});

Item.hasMany( HenchMix, {
    foreignKey: "item_right_id",
    as: "item_right"
});

HenchMix.hasOne( Item, {
    sourceKey: "item_right_id",
    foreignKey: "id",
    as: "item_right"
});

// Mix
Hench.hasMany( HenchMix, {
    foreignKey: "hench_result_id",
    as: "mix"
});