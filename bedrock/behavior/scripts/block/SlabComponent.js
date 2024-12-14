/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import { EquipmentSlot, Direction } from "@minecraft/server";
import { getInteractSound } from "../utils.js";

/**
 * Author: Legopitstop
 */
export class SlabComponent {
  static typeId = "moreblocks:slab";

  constructor(doubleName = "moreblocks:double") {
    this.doubleName = doubleName;
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  canBeDoubled(e) {
    const state = e.block.permutation;
    const stack = e.player
      .getComponent("minecraft:equippable")
      .getEquipment(EquipmentSlot.Mainhand);
    if (!stack) {
      return false;
    }
    return (
      !state.getState(this.doubleName) &&
      stack.typeId === e.block.getItemStack().typeId &&
      ((state.getState("minecraft:vertical_half") == "top" &&
        e.face === Direction.Down) ||
        (state.getState("minecraft:vertical_half") == "bottom" &&
          e.face === Direction.Up))
    );
  }

  onPlayerInteract(e) {
    const state = e.block.permutation;
    if (this.canBeDoubled(e)) {
      e.player.dimension.playSound(
        getInteractSound(e.block),
        e.block.location
      );
      e.block.setPermutation(state.withState(this.doubleName, true));
    }
  }
}
