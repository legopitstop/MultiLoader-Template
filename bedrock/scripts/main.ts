import { StartupEvent, system } from "@minecraft/server";
import { registerBlockComponents, registerCommands, registerItemComponents } from "./registry.js";

function startup(event: StartupEvent): void {
  registerBlockComponents(event.blockComponentRegistry);
  registerItemComponents(event.itemComponentRegistry);
  registerCommands(event.customCommandRegistry);
}

system.beforeEvents.startup.subscribe(startup);
