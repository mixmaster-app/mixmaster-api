import { APIManager } from "./src/Services/APIManager";
import { HenchController } from "./src/Controller/HenchController";
import { log } from "~/Services/Logger";
import { Config } from "~/config/Config";
import { ZoneController } from "~/Controller/ZoneController";

log.info("API Started");
log.debug(Config);

const API = new APIManager( { port: Config.API.port } );
API.init();

const henchsHandler = new HenchController(API.getApp());
const zoneHandler = new ZoneController(API.getApp());
API.addControllers([
    zoneHandler.getController(),
    henchsHandler.getController(),
]);

API.run();
