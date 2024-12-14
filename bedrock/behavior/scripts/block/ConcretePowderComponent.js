/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import { BlockPermutation } from "@minecraft/server";

/**
 * Author: Legopitstop
 */
export class ConcretePowderComponent {
  static typeId = "moreblocks:concrete_powder";

  constructor() {
    this.onTick = this.onTick.bind(this);
  }

  hasWater(block) {
    let north = block.north();
    if (north && north.hasTag('water')) return true;
    let south = block.south();
    if (south && south.hasTag('water')) return true;
    let east = block.east();
    if (east && east.hasTag('water')) return true;
    let west = block.west();
    if (west && west.hasTag('water')) return true;
    let above = block.above();
    if (above && above.hasTag('water')) return true;
    let below = block.below();
    if (below && below.hasTag('water')) return true;
    return false;
  }

  hardenBlock(block) {
    block.setPermutation(
      BlockPermutation.resolve(
        block.typeId.replace('_powder', ''),
        block.permutation.getAllStates()
      )
    );
  }

  onTick(e) {
    if (!this.hasWater(e.block)) return;
    this.hardenBlock(e.block);
  }
}
