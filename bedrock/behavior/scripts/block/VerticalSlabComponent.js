/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import { EquipmentSlot } from "@minecraft/server";
import { getInteractSound, getOpposite } from "../utils.js";

/**
 * Author: Legopitstop
 */
export class VerticalSlabComponent {
  static typeId = "moreblocks:vertical_slab";

  constructor(
    doubleState = "moreblocks:double",
    directionState = "minecraft:cardinal_direction"
  ) {
    this.doubleState = doubleState;
    this.directionState = directionState;
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  canBeDoubled(e) {
    const state = e.block.permutation;
    const dir = state.getState(this.directionState);
    const stack = e.player
      .getComponent("minecraft:equippable")
      .getEquipment(EquipmentSlot.Mainhand);
    if (!stack) {
      return false;
    }
    return (
      !state.getState(this.doubleState) &&
      stack.typeId === e.block.getItemStack().typeId &&
      getOpposite(dir) == e.face.toLowerCase()
    );
  }

  onPlayerInteract(e) {
    const state = e.block.permutation;
    if (this.canBeDoubled(e)) {
      e.player.dimension.playSound(getInteractSound(e.block), e.block.location);
      e.block.setPermutation(state.withState(this.doubleState, true));
    }
  }
}
