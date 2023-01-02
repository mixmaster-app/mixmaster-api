import { Item } from "~/Models/Item";
import { ItemCategory } from "~/Models/ItemCategory";

export class ItemDAO {

    static findAll() {
        return Item.findAll();
    }

    static findAllMixItem() {
        return Item.findAll(
            {
                where: { item_category_id : 1 },
                include: [
                    {
                        model: ItemCategory,
                        as: "item_category"
                    }
                ]
            }
        );
    }

}