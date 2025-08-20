import { BlockComponent } from "./block/example.js";
import { exampleCommand, executeExampleCommand } from "./command/example.js";
import { ItemComponent } from "./item/example.js";
import { BlockComponentRegistry, CustomCommandRegistry, ItemComponentRegistry } from "@minecraft/server";

export function registerBlockComponents(registry: BlockComponentRegistry): void {
  registry.registerCustomComponent(BlockComponent.typeId, new BlockComponent());
}

export function registerItemComponents(registry: ItemComponentRegistry): void {
  registry.registerCustomComponent(ItemComponent.typeId, new ItemComponent());
}

export function registerCommands(registry: CustomCommandRegistry): void {
  registry.registerCommand(exampleCommand, executeExampleCommand);
}
