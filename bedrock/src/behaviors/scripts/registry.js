import { BlockComponent } from "./block/BlockComponent.js";
import { ItemComponent } from "./item/ItemComponent.js";

export function registerBlockComponents(e) {
  e.registerCustomComponent(BlockComponent.typeId, new BlockComponent());
}

export function registerItemComponents(e) {
  e.registerCustomComponent(ItemComponent.typeId, new ItemComponent());
}
