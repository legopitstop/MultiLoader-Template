import { EquipmentSlot } from "@minecraft/server";

export function numberToDirection(num) {
  switch (num) {
    case 0:
      return "north";
    case 1:
      return "south";
    case 2:
      return "east";
    case 3:
      return "west";
    case 4:
      return "top";
    case 5:
      return "bottom";
    default:
      return "north";
  }
}

export function rotateYCounterclockwise(dir) {
  if (!dir) {
    return undefined;
  }
  if (typeof dir == 'number') dir = numberToDirection(dir);
  switch (dir.toLowerCase()) {
    case "north":
      return "east";
    case "east":
      return "south";
    case "south":
      return "west";
    case "west":
      return "north";
    default:
      return "north";
  }
}

export function getAxis(dir) {
  if (!dir) {
    return undefined;
  }
  if (typeof dir == 'number') dir = numberToDirection(dir);
  switch (dir.toLowerCase()) {
    case "north":
    case "south":
      return "x";
    case "east":
    case "west":
      return "z";
    case "top":
    case "bottom":
      return "y";
    default:
      return "x";
  }
}

export function getOpposite(dir) {
  if (!dir) {
    return undefined;
  }
  if (typeof dir == 'number') dir = numberToDirection(dir);
  switch (dir.toLowerCase()) {
    case 0:
    case "north":
      return "south";
    case 1:
    case "south":
      return "north";
    case 2:
    case "east":
      return "west";
    case 3:
    case "west":
      return "east";
    case 4:
    case "top":
    case "above":
      return "bottom";
    case 5:
    case "bottom":
    case "below":
      return "top";
    default:
      return "north";
  }
}

export function directionToOffset(dir) {
  if (dir==undefined) {
    return undefined;
  }
  if (typeof dir == 'number') dir = numberToDirection(dir);
  switch (dir.toLowerCase()) {
    case 0:
    case "north":
      return { x: 0, y: 0, z: -1 };
    case 1:
    case "south":
      return { x: 0, y: 0, z: 1 };
    case 2:
    case "east":
      return { x: 1, y: 0, z: 0 };
    case 3:
    case "west":
      return { x: -1, y: 0, z: 0 };
    case 4:
    case "above":
    case "up":
      return { x: 0, y: 1, z: 0 };
    case 5:
    case "below":
    case "down":
      return { x: 0, y: -1, z: 0 };
    default:
      return { x: 0, y: 0, z: 0 };
  }
}

export function isAxe(itemStack) {
  if (!itemStack) {
    return undefined;
  }
  return itemStack.hasTag("axe") || itemStack.typeId.endsWith("_axe");
}
export function hasAxe(player) {
  let eq = player.getComponent("minecraft:equippable");
  let stack = eq.getEquipment(EquipmentSlot.Mainhand);
  return stack && stack.hasTag("minecraft:is_axe");
}

export function holdingItem(player, itemId) {
  let eq = player.getComponent("minecraft:equippable");
  let stack = eq.getEquipment(EquipmentSlot.Mainhand);
  return stack && stack.typeId == itemId;
}

// 'x,y,z': [north, south, east, west, above, below]
var MAX_CACHE = 512;
var CACHE = {};
export function getNeighborUpdate(e) {
  var size = Object.keys(CACHE).length;
  if (size > MAX_CACHE) {CACHE = {};}
  var key = `${e.block.location.x},${e.block.location.y},${e.block.location.z}`;
  const cached = CACHE[key];
  const perms = [
    e.block.north()?.permutation,
    e.block.south()?.permutation,
    e.block.east()?.permutation,
    e.block.west()?.permutation,
    e.block.above()?.permutation,
    e.block.below()?.permutation,
  ];
  if (!cached) {
    CACHE[key] = perms;
    return undefined;
  }
  for (let i = 0; i < perms.length; i++) {
    if (cached[i] != perms[i]) {
      CACHE[key] = perms;
      return e.block.offset(directionToOffset(i));
    }
  }
  return undefined;
}

import { ItemStack } from "@minecraft/server";

export const CANDLES = [
  "candle",
  "white_candle",
  "light_gray_candle",
  "gray_candle",
  "black_candle",
  "brown_candle",
  "red_candle",
  "orange_candle",
  "yellow_candle",
  "lime_candle",
  "green_candle",
  "cyan_candle",
  "light_blue_candle",
  "blue_candle",
  "purple_candle",
  "magenta_candle",
  "pink_candle",
];

export function inRange(value, min, max) {
  return min <= value && max >= value;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function replaceStack(player, slot, resultStack) {
  const inv = player.getComponent("inventory");
  const equ = player.getComponent("equippable");
  const stack = equ.getEquipment(slot);
  if (stack.amount === 1) {
    equ.setEquipment(slot, resultStack);
  } else {
    inv.container.addItem(resultStack);
    stack.amount -= 1;
    equ.setEquipment(slot, stack);
  }
}

export function decrementStack(player, slot, amount = 1) {
  const equ = player.getComponent("equippable");
  const stack = equ.getEquipment(slot);
  if (stack.amount <= amount) {
    equ.setEquipment(slot, new ItemStack("air"));
    return;
  }
  stack.amount -= amount;
  equ.setEquipment(slot, stack);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// TODO: CACHE
const CACHED_SOUNDS = {}

function cacheSound(blockId, soundEvent) {
  CACHED_SOUNDS[blockId] = soundEvent;
  return soundEvent;
}

/**
 * Returns the sound event that should be used for the block. Cached to improve speed.
*/
export function getInteractSound(block, defaultSound='dig.stone') {
  const id = block.typeId;
  const snd = CACHED_SOUNDS[id];
  if (snd) return snd;
  // TODO: Use array
  const sounds = {
    'dig.gravel': ['dirt','farmland','gravel'],
    'dig.stem': ['crimson', 'warped'],
    'break.cherry_wood': ['cherry'],
  }
  if (id.includes("dirt") || id.includes("farmland") || id.includes("gravel")) return cacheSound(id, "dig.gravel");
  if (id.includes("crimson") || id.includes("warped")) return cacheSound(id, "dig.stem");
  if (id.includes("cherry")) return cacheSound(id, "break.cherry_wood");
  return cacheSound(id, defaultSound);
}

export function getRedstoneLevel(block) {
  return 0;
}
