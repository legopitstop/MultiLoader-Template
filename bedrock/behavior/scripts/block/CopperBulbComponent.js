/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import { getNeighborUpdate } from "../utils.js";


/**
 * Author: Legopitstop
 */
export class CopperBulbComponent {
  static typeId = "moreblocks:copper_bulb";

  constructor(litState = "moreblocks:lit", poweredState='moreblocks:powered') {
    this.litState = litState;
    this.poweredState = poweredState;
    this.onTick = this.onTick.bind(this);
  }

  onTick(e) {
    const powered = e.block.permutation.getState(this.poweredState);
    const lit = e.block.permutation.getState(this.litState);
    const update = getNeighborUpdate(e);
    if (update) {
      let level = update.getRedstonePower()
      if (level==undefined) return;
      if (level == 0) {
        // TODO: Delay
        e.block.setPermutation(e.block.permutation.withState(this.poweredState, false));
        return;
      }
      e.block.setPermutation(e.block.permutation.withState(this.poweredState, true));
      e.block.setPermutation(e.block.permutation.withState(this.litState, !lit));
    }
  }
}
