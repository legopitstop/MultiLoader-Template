/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import { BlockPermutation, system } from "@minecraft/server";

/**
 * Author: Legopitstop
 */
export class CoralComponent {
  static typeId = "moreblocks:coral";

  constructor() {
    this.onTick = this.onTick.bind(this);
    this.delay = 0;
  }

  hasWater(block) {
    let north = block.north();
    if (north && north.hasTag("water")) return true;
    let south = block.south();
    if (south && south.hasTag("water")) return true;
    let east = block.east();
    if (east && east.hasTag("water")) return true;
    let west = block.west();
    if (west && west.hasTag("water")) return true;
    let above = block.above();
    if (above && above.hasTag("water")) return true;
    let below = block.below();
    if (below && below.hasTag("water")) return true;
    return false;
  }

  killBlock(block) {
    let var1 = block.typeId.split(":");
    let var2 = "dead_" + var1[1];
    block.setPermutation(
      BlockPermutation.resolve(
        `${var1[0]}:${var2}`,
        block.permutation.getAllStates()
      )
    );
  }

  onTick(e) {
    const water = this.hasWater(e.block);

    if (water && this.delay != 0) {
      this.delay = 0;
      return;
    }

    if (!water && this.delay == 0) {
      this.delay = 60;
      return;
    }

    if (this.delay > 0) {
      this.delay--;
      if (this.delay <= 0) {
        this.killBlock(e.block);
      }
      return;
    }
  }
}
