/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import { EquipmentSlot, Direction } from "@minecraft/server";
import { getInteractSound } from "../utils.js";

/**
 * Author: Legopitstop
 */
export class HeightComponent {
  static typeId = "moreblocks:height";

  constructor(
    layersState = "moreblocks:layers",
    maxLayers = 8
  ) {
    this.layersState = layersState;
    this.maxLayers = maxLayers;
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  canBeIncreased(e) {
    const state = e.block.permutation;
    const stack = e.player
      .getComponent("minecraft:equippable")
      .getEquipment(EquipmentSlot.Mainhand);
    if (!stack) {
      return false;
    }
    const layers = state.getState(this.layersState);
    return (
      layers < this.maxLayers &&
      stack.typeId === e.block.getItemStack().typeId &&
      ((state.getState("minecraft:vertical_half") == "top" &&
        e.face === Direction.Down) ||
        (state.getState("minecraft:vertical_half") == "bottom" &&
          e.face === Direction.Up))
    );
  }

  onPlayerInteract(e) {
    const state = e.block.permutation;
    const newLayers = state.getState(this.layersState) + 1;
    if (this.canBeIncreased(e)) {
      e.player.dimension.playSound(getInteractSound(e.block), e.block.location);
      e.block.setPermutation(state.withState(this.layersState, newLayers));
    }
  }
}
