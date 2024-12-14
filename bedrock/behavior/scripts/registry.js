import { SlabComponent } from "./block/SlabComponent.js";
import { VerticalSlabComponent } from "./block/VerticalSlabComponent.js";
import { HeightComponent } from "./block/HeightComponent.js";
import { StairsComponent } from "./block/StairsComponent.js";
import { ConcretePowderComponent } from "./block/ConcretePowderComponent.js";
import { CoralComponent } from "./block/CoralComponent.js";
import { StrippableComponent } from "./block/StrippableComponent.js";
import { RedstoneLampComponent } from "./block/RedstoneLampComponent.js";
import { CopperComponent } from "./block/CopperComponent.js";
import { FarmlandComponent } from "./block/FarmlandComponent.js";
import { CopperBulbComponent } from "./block/CopperBulbComponent.js";
import { LegacyComponent } from "./block/LegacyComponent.js";

/**
 * Author: Legopitstop
 */
export function registerBlockComponents(registry) {
  registry.registerCustomComponent(
    StairsComponent.typeId,
    new StairsComponent()
  );
  registry.registerCustomComponent(SlabComponent.typeId, new SlabComponent());
  registry.registerCustomComponent(
    VerticalSlabComponent.typeId,
    new VerticalSlabComponent()
  );
  registry.registerCustomComponent(
    HeightComponent.typeId,
    new HeightComponent()
  );
  registry.registerCustomComponent(
    StrippableComponent.typeId,
    new StrippableComponent()
  );
  registry.registerCustomComponent(
    ConcretePowderComponent.typeId,
    new ConcretePowderComponent()
  );
  registry.registerCustomComponent(
    CopperComponent.typeId,
    new CopperComponent()
  );
  registry.registerCustomComponent(
    CoralComponent.typeId,
    new CoralComponent()
  );
  registry.registerCustomComponent(
    RedstoneLampComponent.typeId,
    new RedstoneLampComponent()
  );
  registry.registerCustomComponent(
    FarmlandComponent.typeId,
    new FarmlandComponent()
  );
  registry.registerCustomComponent(
    CopperBulbComponent.typeId,
    new CopperBulbComponent()
  );
  
  registry.registerCustomComponent(
    LegacyComponent.typeId,
    new LegacyComponent()
  );
}
