import { DataTypes } from "sequelize";
import { Database } from "~/Services/DatabaseAccess";
import { DefaultOptions } from "./AbstractModel";
import { ItemCategory } from "./ItemCategory";

const sequelize = (new Database()).getDb();

export const Item = sequelize.define("Item",
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
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        item_category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: ItemCategory,
                key: "id"
            }
        }
    }, {
        ...DefaultOptions,
        tableName: "item"
    }
);

ItemCategory.hasOne( Item );

Item.belongsTo(
    ItemCategory,
    {
        foreignKey: "item_category_id",
        as: "item_category"
    }
);
Item.removeAttribute("ItemCategoryId");