import { world } from "@minecraft/server";
import { registerBlockComponents, registerItemComponents } from "./registry.js";

function worldInitialize(r) {
  registerBlockComponents(r.blockComponentRegistry);
  registerItemComponents(r.itemComponentRegistry);
}
world.beforeEvents.worldInitialize.subscribe(worldInitialize);
