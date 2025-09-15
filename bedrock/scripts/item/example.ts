import {
  CustomComponentParameters,
  ItemCompleteUseEvent,
  ItemComponentBeforeDurabilityDamageEvent,
  ItemComponentConsumeEvent,
  ItemComponentHitEntityEvent,
  ItemComponentMineBlockEvent,
  ItemComponentUseEvent,
  ItemComponentUseOnEvent,
} from "@minecraft/server";

export class ItemComponent {
  static typeId = "mod_id:item_component";

  constructor() {
    this.onBeforeDurabilityDamage = this.onBeforeDurabilityDamage.bind(this);
    this.onCompleteUse = this.onCompleteUse.bind(this);
    this.onConsume = this.onConsume.bind(this);
    this.onHitEntity = this.onHitEntity.bind(this);
    this.onMineBlock = this.onMineBlock.bind(this);
    this.onUse = this.onUse.bind(this);
    this.onUseOn = this.onUseOn.bind(this);
  }

  // EVENTS

  onBeforeDurabilityDamage(
    event: ItemComponentBeforeDurabilityDamageEvent,
    args: CustomComponentParameters,
  ): void {}

  onCompleteUse(
    event: ItemCompleteUseEvent,
    args: CustomComponentParameters,
  ): void {}

  onConsume(
    event: ItemComponentConsumeEvent,
    args: CustomComponentParameters,
  ): void {}

  onHitEntity(
    event: ItemComponentHitEntityEvent,
    args: CustomComponentParameters,
  ): void {}

  onMineBlock(
    event: ItemComponentMineBlockEvent,
    args: CustomComponentParameters,
  ): void {}

  onUse(event: ItemComponentUseEvent, args: CustomComponentParameters): void {}

  onUseOn(
    event: ItemComponentUseOnEvent,
    args: CustomComponentParameters,
  ): void {}
}
