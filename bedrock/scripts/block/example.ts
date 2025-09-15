import {
  BlockComponentEntityFallOnEvent,
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerBreakEvent,
  BlockComponentPlayerInteractEvent,
  BlockComponentPlayerPlaceBeforeEvent,
  BlockComponentRandomTickEvent,
  BlockComponentStepOffEvent,
  BlockComponentStepOnEvent,
  BlockComponentTickEvent,
  CustomComponentParameters,
} from "@minecraft/server";

export class BlockComponent {
  static typeId = "mod_id:block_component";

  constructor() {
    this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
    this.onEntityFallOn = this.onEntityFallOn.bind(this);
    this.onPlace = this.onPlace.bind(this);
    this.onPlayerBreak = this.onPlayerBreak.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onRandomTick = this.onRandomTick.bind(this);
    this.onStepOff = this.onStepOff.bind(this);
    this.onStepOn = this.onStepOn.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  // EVENTS

  beforeOnPlayerPlace(
    event: BlockComponentPlayerPlaceBeforeEvent,
    args: CustomComponentParameters,
  ): void {}

  onEntityFallOn(
    event: BlockComponentEntityFallOnEvent,
    args: CustomComponentParameters,
  ): void {}

  onPlace(
    event: BlockComponentOnPlaceEvent,
    args: CustomComponentParameters,
  ): void {}

  onPlayerBreak(
    event: BlockComponentPlayerBreakEvent,
    args: CustomComponentParameters,
  ): void {}

  onPlayerInteract(
    event: BlockComponentPlayerInteractEvent,
    args: CustomComponentParameters,
  ): void {}

  onRandomTick(
    event: BlockComponentRandomTickEvent,
    args: CustomComponentParameters,
  ): void {}

  onStepOff(
    event: BlockComponentStepOffEvent,
    args: CustomComponentParameters,
  ): void {}

  onStepOn(
    event: BlockComponentStepOnEvent,
    args: CustomComponentParameters,
  ): void {}

  onTick(
    event: BlockComponentTickEvent,
    args: CustomComponentParameters,
  ): void {}
}
