/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */
import {
  directionToOffset,
  rotateYCounterclockwise,
  getOpposite,
  getAxis,
  getNeighborUpdate,
} from "../utils.js";

/**
 * Author: Legopitstop
 */
export class StairsComponent {
  static typeId = "moreblocks:stairs";

  constructor(
    facingState = "minecraft:cardinal_direction",
    halfState = "minecraft:vertical_half"
  ) {
    this.facingState = facingState;
    this.halfState = halfState;
    this.onPlace = this.onPlace.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  isStairs(block) {
    return (
      block.hasTag("minecraft:stairs") ||
      block.hasTag("stairs") ||
      block.typeId.toString().endsWith("stairs")
    );
  }
  isDifferentOrientation(block, dir) {
    var blockState = block.offset(directionToOffset(dir));
    return (
      !this.isStairs(blockState) ||
      blockState.permutation.getState(this.facingState) !=
        block.permutation.getState(this.facingState) ||
      blockState.permutation.getState(this.halfState) !=
        block.permutation.getState(this.halfState)
    );
  }

  getStairsShape(block) {
    var direction3;
    var direction2;

    // Back
    var direction = block.permutation.getState(this.facingState);
    var blockState = block.offset(directionToOffset(direction));
    if (
      this.isStairs(blockState) &&
      block.permutation.getState(this.halfState) ==
        blockState.permutation.getState(this.halfState) &&
      getAxis(
        (direction2 = blockState.permutation.getState(this.facingState))
      ) != getAxis(block.permutation.getState(this.facingState)) &&
      this.isDifferentOrientation(block, getOpposite(direction2))
    ) {
      if (direction2 == rotateYCounterclockwise(direction)) {
        return "inner_right";
      }
      return "inner_left";
    }

    // Front
    var blockState2 = block.offset(directionToOffset(getOpposite(direction)));
    if (
      this.isStairs(blockState2) &&
      block.permutation.getState(this.halfState) ==
        blockState2.permutation.getState(this.halfState) &&
      getAxis(
        (direction3 = blockState2.permutation.getState(this.facingState))
      ) != getAxis(block.permutation.getState(this.facingState)) &&
      this.isDifferentOrientation(block, direction3)
    ) {
      if (direction3 == rotateYCounterclockwise(direction)) {
        return "outer_right";
      }
      return "outer_left";
    }
    return "straight";
  }

  update(e) {
    const state = e.block.permutation;
    var shape = this.getStairsShape(e.block); // e.block -> e.block.permutation
    if (state.getState("moreblocks:shape") != shape) {
      e.block.setPermutation(state.withState("moreblocks:shape", shape));
    }
  }

  onPlace(e) {
    this.update(e);
  }

  onTick(e) {
    if (!getNeighborUpdate(e)) {
      return;
    }
    this.update(e);
  }
}
