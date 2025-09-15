import {
  CustomCommand,
  CustomCommandOrigin,
  CustomCommandParamType,
  CustomCommandResult,
} from "@minecraft/server";

export const exampleCommand: CustomCommand = {
  name: "mod_id:example",
  description: "desc",
  permissionLevel: 1,
  mandatoryParameters: [{ name: "name", type: CustomCommandParamType.String }],
};

export function executeExampleCommand(
  ctx: CustomCommandOrigin,
  name: string,
): CustomCommandResult | undefined {
  console.warn(`Hello, ${name}`);
  return;
}
