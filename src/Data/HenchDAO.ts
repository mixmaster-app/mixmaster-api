import { Op, Sequelize, WhereOptions } from "sequelize";
import { Hench } from "~/Models/Henchs/Hench";
import { HenchMix } from "~/Models/Henchs/HenchMix";
import { HenchStats } from "~/Models/Henchs/HenchStats";
import { HenchType } from "~/Models/Henchs/HenchType";
import { Item } from "~/Models/Item";
import { Zone } from "~/Models/Zone";
import { fusionEvolutions, fusionEvolutionsList } from "~/Services/Transformer/HenchTransformer";

const REFERENCES = {
    include: [
        {
            model: Zone,
            as: "zones",
            through: { attributes: [] }
        },
        {
            model: HenchType,
            as: "type",
        },
        {
            model: HenchStats,
            as: "stats",
            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
        },
        {
            model: HenchMix,
            as: "mix",
            attributes: [ "id" ],
            separate: true,
            include: [
                {
                    model: Hench,
                    as: "hench_result",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Hench,
                    as: "hench_left",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Item,
                    as: "item_left"
                },
                {
                    model: Hench,
                    as: "hench_right",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Item,
                    as: "item_right"
                }
            ]
        },
        {
            model: HenchMix,
            as: "evolutions_right",
            attributes: [ "id" ],
            separate: true,
            include: [
                {
                    model: Hench,
                    as: "hench_result",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Hench,
                    as: "hench_left",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Item,
                    as: "item_left"
                },
                {
                    model: Hench,
                    as: "hench_right",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Item,
                    as: "item_right"
                }
            ]
        },
        {
            model: HenchMix,
            as: "evolutions_left",
            attributes: [ "id" ],
            separate: true,
            include: [
                {
                    model: Hench,
                    as: "hench_result",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Hench,
                    as: "hench_left",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Item,
                    as: "item_left"
                },
                {
                    model: Hench,
                    as: "hench_right",
                    include: [
                        {
                            model: Zone,
                            as: "zones",
                            through: { attributes: [] }
                        },
                        {
                            model: HenchType,
                            as: "type",
                        },
                        {
                            model: HenchStats,
                            as: "stats",
                            attributes: [ "hp", "mp", "attack", "power", "speed", "accuracy", "chance" ]
                        },
                    ],
                },
                {
                    model: Item,
                    as: "item_right"
                }
            ]
        },
    ]
};

const DEFAULT_LIMIT = 3000;

class HenchDAO {

    static async findAll(limit: number) {
        let result = await Hench.findAll({
            limit: isNaN(limit) ? DEFAULT_LIMIT : limit,
            order: [
                ['minimum_level', 'ASC'],
                ['id', 'ASC']
            ],
            include: REFERENCES.include
        });
        return fusionEvolutionsList(result);
    }

    static async findOneById(id: number) {
        let result = await Hench.findOne({
            where: { id: id },
            limit: 1,
            include: REFERENCES.include
        });
        return fusionEvolutions({ ...result?.toJSON() });
    }

    static async findMixOfHench(id: number) {
        let result = await this.findOneById(id);
        return result?.mix ?? [];
    }

    static async findEvolutionsOfHench(id: number) {
        let result = await this.findOneById(id);
        return result?.evolutions ?? [];
    }

    static async searchByName(search = "", limit = DEFAULT_LIMIT ) {
        let result = await Hench.findAll({
            limit: isNaN(limit) ? DEFAULT_LIMIT : limit,
            where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), { [Op.like]: `%${search.toLocaleLowerCase()}%` }),
            order: [
                ['minimum_level', 'ASC'],
                ['id', 'ASC']
            ],
            include: REFERENCES.include
        });
        return fusionEvolutionsList(result);
    }

    static async filterHench(filters : {search: string, limit: number, types: Array<string>, minimumLevel: number, maximumLevel: number}) {
        let whereFilter: WhereOptions = [];
        if(filters.types.length > 0) {
            whereFilter.push(Sequelize.where(Sequelize.col('type_id'), { [Op.in]: filters.types }));
        }
        whereFilter.push(
            Sequelize.where(Sequelize.col('minimum_level'), { [Op.gte]: filters.minimumLevel }),
            Sequelize.where(Sequelize.col('maximum_level'), { [Op.lte]: filters.maximumLevel })
        );

        let result = await Hench.findAll({
            limit: isNaN(filters.limit) ? DEFAULT_LIMIT : filters.limit,
            where: [
                Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), { [Op.like]: `%${filters.search.toLocaleLowerCase()}%` }),
                ...whereFilter
            ],
            order: [
                ['minimum_level', 'ASC'],
                ['id', 'ASC']
            ],
            include: REFERENCES.include
        });
        return fusionEvolutionsList(result);
    }

}

export {
    DEFAULT_LIMIT,
    HenchDAO
};