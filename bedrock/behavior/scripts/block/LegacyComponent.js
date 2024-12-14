/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import { BlockPermutation } from "@minecraft/server";
import { numberToDirection } from "../utils.js";

/**
 * Author: Legopitstop
 */
export class LegacyComponent {
  static typeId = "more_ss:legacy";

  constructor() {
    this.onPlace = this.onPlace.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  getType(block) {
    if (block.typeId.includes("vertical_slab")) return "vertical_slab";
    if (block.typeId.includes("slab")) return "slab";
    if (block.typeId.includes("stairs")) return "stairs";
    return undefined;
  }

  updateBlock(block) {
    let var1 = block.typeId.split(':');
    const perm = block.permutation;
    let states = {};
    switch (this.getType(block)) {
      case "slab":
        let var2 = perm.getState('lps:type');
        states['minecraft:vertical_half'] = (var2 == 'double' ? 'bottom' : var2);
        states['moreblocks:double'] = (perm.getState('lps:type') == 'double');
        break;

      case "stairs":
        let var3 = perm.getState('lps:shape')
        states['minecraft:cardinal_direction'] = numberToDirection(perm.getState('lps:facing'));
        states['minecraft:vertical_half'] = perm.getState('lps:half');
        states['moreblocks:shape'] = (var3 == 'inner' ? 'inner_left' : ( var3 == 'outer' ? 'outer_left' : 'straight' ));
        break;

      case "vertical_slab":
        states['minecraft:cardinal_direction'] = numberToDirection(perm.getState('lps:direction'));
        states['moreblocks:double'] = (perm.getState('lps:type') == 'double');
        break;
    }
    block.setPermutation(
        BlockPermutation.resolve(
          `moreblocks:${var1[1]}`,
          states
        )
      );
  }

  onPlace(e) {
    if (!e.block.typeId.startsWith('more_ss:')) return;
    this.updateBlock(e.block);
  }

  onTick(e) {
    if (!e.block.typeId.startsWith('more_ss:')) return;
    this.updateBlock(e.block);
  }
}
