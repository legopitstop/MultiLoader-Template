/*
 * See LICENSE for info. Feel free to reference this file for your own Add-On.
 */

import { BlockPermutation } from "@minecraft/server";
import { hasAxe, holdingItem } from "../utils.js";

/**
 * Author: Legopitstop
 */
export class CopperComponent {
  static typeId = "moreblocks:copper";

  constructor() {
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onRandomTick = this.onRandomTick.bind(this);
  }

  isWaxed(block) {
    return block.typeId.includes("waxed_");
  }

  getOxidization(block) {
    if (block.typeId.includes("oxidized")) return "oxidized_copper";
    if (block.typeId.includes("weathered")) return "weathered_copper";
    if (block.typeId.includes("exposed")) return "exposed_copper";
    return "copper";
  }

  waxed(block) {
    let var1 = block.typeId.split(":");
    block.setPermutation(
      BlockPermutation.resolve(
        `${var1[0]}:waxed_${var1[1]}`,
        block.permutation.getAllStates()
      )
    );
    return true;
  }

  unwaxed(block) {
    let var1 = block.typeId.split(":");
    let var2 = var1[1].replace("waxed_", "");
    block.setPermutation(
      BlockPermutation.resolve(
        `${var1[0]}:${var2}`,
        block.permutation.getAllStates()
      )
    );
    return true;
  }

  // TODO: onRandom
  oxidized(block) {
    let oldState = this.getOxidization(block);
    let state;
    switch (oldState) {
      case "weathered_copper":
        state = "oxidized_copper";
        break;
      case "exposed_copper":
        state = "weathered_copper";
        break;
      case "copper":
        state = "exposed_copper";
        break;
      default:
        state = null;
        break;
    }
    if (state == null) return false;
    block.setPermutation(
      BlockPermutation.resolve(
        block.typeId.replace(oldState + "_", state + "_"),
        block.permutation.getAllStates()
      )
    );
    return true;
  }

  unoxidized(block) {
    let oldState = this.getOxidization(block);
    let state;
    switch (oldState) {
      case "oxidized_copper":
        state = "weathered_copper";
        break;
      case "weathered_copper":
        state = "exposed_copper";
        break;
      case "exposed_copper":
        state = "copper";
        break;
      default:
        state = null;
        break;
    }
    if (state == null) return false;
    block.setPermutation(
      BlockPermutation.resolve(
        block.typeId.replace(oldState + "_", state + "_"),
        block.permutation.getAllStates()
      )
    );
    return true;
  }

  onPlayerInteract(e) {
    if (this.isWaxed(e.block) && hasAxe(e.player)) {
      if (hasAxe(e.player)) {
        if (!this.unwaxed(e.block)) return;
        return e.block.dimension.playSound("copper.wax.off", e.block.location);
      }
      return;
    }
    if (hasAxe(e.player)) {
      if (!this.unoxidized(e.block)) return;
      return e.block.dimension.playSound("scrape", e.block.location);
    }
    if (
      !this.isWaxed(e.block) &&
      holdingItem(e.player, "minecraft:honeycomb")
    ) {
      if (!this.waxed(e.block)) return;
      return e.block.dimension.playSound("copper.wax.on", e.block.location);
    }
  }

  onRandomTick(e) {
    if (this.isWaxed(e.block)) return;
    this.oxidized(e.block);
  }
}
