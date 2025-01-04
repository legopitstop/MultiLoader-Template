export class BlockComponent {
  static typeId = "mod_id:block_component";

  constructor() {
    this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
    this.onEntityFallOn = this.onEntityFallOn.bind(this);
    this.onPlace = this.onPlace.bind(this);
    this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onRandomTick = this.onRandomTick.bind(this);
    this.onStepOff = this.onStepOff.bind(this);
    this.onStepOn = this.onStepOn.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  beforeOnPlayerPlace(e) {}

  onEntityFallOn(e) {}

  onPlace(e) {}

  onPlayerDestroy(e) {}

  onPlayerInteract(e) {}

  onRandomTick(e) {}

  onStepOff(e) {}

  onStepOn(e) {}

  onTick(e) {}
}
