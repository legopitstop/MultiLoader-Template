import { Pages } from "@lpsmods/mc-utils";
import { changelogs } from "./changelogs";

export const pages: Pages = {
  home: {
    title: "#title",
    body: "#desc",
    buttons: ["changelogs"]
  },
  ...changelogs
};
