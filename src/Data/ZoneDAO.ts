import { Hench } from "~/Models/Henchs/Hench";
import { Zone } from "~/Models/Zone";

export class ZoneDAO {

    static findAll() {
        return Zone.findAll();
    }

    static findAllWithHenchs() {
        return Zone.findAll({
            include: [
                {
                    model: Hench,
                    as: "henchs"
                }
            ]
        });
    }

}