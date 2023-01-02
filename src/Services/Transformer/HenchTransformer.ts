import { Model } from "sequelize";

export function fusionEvolutions(data: any) {
    let evolutions = [
        ...data.evolutions_left,
        ...data.evolutions_right
    ]
    delete data.evolutions_left;
    delete data.evolutions_right;
    data.evolutions = evolutions;

    return data;
}

export function fusionEvolutionsList(data: Model<any, any>[]) {
    let result: Model<any, any>[] = [];
    data.forEach( (item) => {
        result.push(fusionEvolutions({ ...item?.toJSON() }));
    });
    return result;
}