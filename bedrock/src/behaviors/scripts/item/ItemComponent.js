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

  onBeforeDurabilityDamage(e) {}

  onCompleteUse(e) {}

  onConsume(e) {}

  onHitEntity(e) {}

  onMineBlock(e) {}

  onUse(e) {}

  onUseOn(e) {}
}
