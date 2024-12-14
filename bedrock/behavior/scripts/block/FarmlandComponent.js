/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */

import { BlockPermutation } from "@minecraft/server";

/**
 * Author: Legopitstop
 */
export class FarmlandComponent {
  static typeId = "moreblocks:farmland";

  constructor(moistureState = "moreblocks:moisture") {
    this.moistureState = moistureState;
    this.onTick = this.onTick.bind(this); // onRandomTick
    this.onEntityFallOn = this.onEntityFallOn.bind(this);
    this.delay = 0;
  }

  hasWater(block) {
    for (let x = -5; x < 5; x++) {
      for (let y = -1; y < 1; y++) {
        for (let z = -5; z < 5; z++) {
          const blk = block.offset({ x: x, y: y, z: z });
          if (blk && blk.hasTag("water")) return true;
        }
      }
    }
    return false;
  }

  convertToDirt(block) {
      const states = block.permutation.getAllStates();
      delete states[this.moistureState];
      block.setPermutation(
        BlockPermutation.resolve(
          block.typeId.replace('farmland', 'dirt'),
          states
        )
      );

  }

  onTick(e) {
    const moisture = e.block.permutation.getState(this.moistureState);
    const water = this.hasWater(e.block);
    if (water && moisture < 7) {
      if (this.delay == 0) {
        this.delay = 60;
      } else {
        this.delay--;
        if (this.delay == 0) {
          e.block.setPermutation(
            e.block.permutation.withState(this.moistureState, moisture + 1)
          );
        }
      }
      return;
    }

    if (!water && moisture > 0) {
      if (this.delay == 0) {
        this.delay = 60;
      } else {
        this.delay--;
        if (this.delay == 0) {
          e.block.setPermutation(
            e.block.permutation.withState(this.moistureState, moisture - 1)
          );
        }
      }
      return;
    }
    
    if (!water && moisture == 0) {
      if (this.delay == 0) {
        this.delay = 1200;
      } else {
        this.delay--;
        if (this.delay == 0) {
      this.convertToDirt(e.block);
        }
      }
      return;
    }
  }

  onEntityFallOn(e) {
    if (e.fallDistance > 1) {
      this.convertToDirt(e.block);
      return;
    }
  }
}
