import { AddonUtils, GuideBookComponent } from "@lpsmods/mc-utils";
import { BlockComponent } from "./block/example.js";
import { exampleCommand, executeExampleCommand } from "./command/example.js";
import { ItemComponent } from "./item/example.js";
import {
  BlockComponentRegistry,
  CustomCommandRegistry,
  ItemComponentRegistry,
} from "@minecraft/server";
import { pages } from "./guide/main.js";

export function registerBlockComponents(
  registry: BlockComponentRegistry,
): void {
  registry.registerCustomComponent(BlockComponent.typeId, new BlockComponent());
}

export function registerItemComponents(registry: ItemComponentRegistry): void {
  const id = AddonUtils.makeId("guide_book");
  registry.registerCustomComponent(
    id,
    new GuideBookComponent(pages),
  );
  GuideBookComponent.setup(id);
  registry.registerCustomComponent(ItemComponent.typeId, new ItemComponent());
}

export function registerCommands(registry: CustomCommandRegistry): void {
  registry.registerCommand(exampleCommand, executeExampleCommand);
}
