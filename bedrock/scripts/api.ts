import { AddonUtils } from "@lpsmods/mc-utils";
import { Bridge } from "@lpsmods/mcaddon-bridge";
import { world } from "@minecraft/server";

const api = new Bridge(AddonUtils.addonId);
// Basic property
api.defineProperty(world, "name", {
  value: "Steve",
  writeable: true,
  enumerable: true,
  configurable: true,
});

// Getter and Setter
api.defineProperty(world, "fullName", {
  get() {
    const firstName = world.getDynamicProperty("first_name");
    const lastName = world.getDynamicProperty("last_name");
    return `${firstName} ${lastName}`;
  },

  set(value) {
    const parts = value.split(" ");
    world.setDynamicProperty("first_name", parts[0]);
    world.setDynamicProperty("last_name", parts[1]);
  },
  enumerable: true,
  configurable: true,
});

// Simple function property
api.defineProperty(world, "greet", {
  value: function (name: string) {
    console.warn(`Hello, ${name}!`);
  },
  writeable: true,
  enumerable: true,
  configurable: true,
});