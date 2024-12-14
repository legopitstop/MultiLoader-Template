/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */

import { BlockPermutation } from "@minecraft/server";
import { getInteractSound, hasAxe } from "../utils.js";

/**
 * Author: Legopitstop
 */
export class StrippableComponent {
  static typeId = "moreblocks:strippable";

  constructor() {
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  stripBlock(block) {
    let var1 = block.typeId.split(":");
    let var2 = "stripped_" + var1[1];
    block.setPermutation(
      BlockPermutation.resolve(
        `${var1[0]}:${var2}`,
        block.permutation.getAllStates()
      )
    );
    block.dimension.playSound(getInteractSound(block, 'dig.wood'), block.location);
  }

  onPlayerInteract(e) {
    if (!hasAxe(e.player)) return;
    this.stripBlock(e.block);
  }
}
