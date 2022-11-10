import { APIManager } from "./src/Services/APIManager";
import { HenchController } from "./src/Controller/HenchController";
import { log } from "~/Services/Logger";
import { config } from "~/config/Config";

log.info("API Started");
log.debug(config);
const API = new APIManager( { port: config.API.port } );
API.init();

const henchsHandler = new HenchController(API.getApp());
API.addController(henchsHandler.getController());

API.run();
