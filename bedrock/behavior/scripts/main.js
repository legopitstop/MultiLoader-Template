import { world } from "@minecraft/server";
import { registerBlockComponents } from "./registry.js";

/**
 * Author: Legopitstop
 */
function worldInitialize(e) {
  registerBlockComponents(e.blockComponentRegistry);
}

world.beforeEvents.worldInitialize.subscribe(worldInitialize);
