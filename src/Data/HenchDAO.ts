import { Op, Sequelize } from "sequelize";
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

const DEFAULT_LIMIT = 30;

export class HenchDAO {

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
        return result?.mix;
    }

    static async findEvolutionsOfHench(id: number) {
        let result = await this.findOneById(id);
        return result?.evolutions;
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

}