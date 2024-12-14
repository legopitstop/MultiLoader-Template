/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */

import { getNeighborUpdate } from "../utils.js";

/**
 * Author: Legopitstop
 */
export class RedstoneLampComponent {
  static typeId = "moreblocks:redstone_lamp";

  constructor(litState = "moreblocks:lit") {
    this.litState = litState;
    this.onTick = this.onTick.bind(this);
    this.delay = 0;
  }

  onTick(e) {
    const update = getNeighborUpdate(e);
    if (update) {
      let level = update.getRedstonePower()
      if (level==undefined) return;
      if (level == 0) {
        // TODO: Delay
        e.block.setPermutation(e.block.permutation.withState(this.litState, false));
        return;
      }
      e.block.setPermutation(e.block.permutation.withState(this.litState, true));
    }
  }
}
