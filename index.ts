import { APIManager } from "./src/Services/APIManager";
import { HenchController } from "./src/Controller/HenchController";
const CONFIG = {
    port: 3000
};

console.log(`■■■■■■■■■■■■■■■■[  API start  ]■■■■■■■■■■■■■■■■`);
console.log(CONFIG);
console.log(`■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■`);

const API = new APIManager( { port: CONFIG.port } );
API.init();

const henchsHandler = new HenchController(API.getApp());
API.addController(henchsHandler.getController());

API.registerEveryUnknownRoutes();
