import { createElement } from "../components";
import { styleIcon } from "./status";

const search = createElement(
  "div",
  {
    class: [
      "flex",
      "items-center",
      "bg-[#222e35]",
      "rounded-md",
      "p-2",
      "mx-4",
      "mt-4",
    ],
  },
  [
    createElement("i", {
      class: ["bi", "bi-search", "text-white", "text-lg"],
    }),
    createElement("input", {
      type: "text",
      placeholder: "Search settings...",
      class: ["ml-2", "bg-transparent", "text-white", "outline-none", "w-full"],
    }),
  ]
);

export const channels = createElement(
  "div",
  {
    class: ["w-full", "h-full", "flex", "flex-col", "gap-2"],
  },
  [
    createElement(
      "div",
      {
        class: ["w-full", "flex", "justify-between", "items-center", "p-5"],
      },
      [
        createElement(
          "h1",
          {
            class: ["text-white", "text-3xl", "font-bold"],
          },
          "Channels"
        ),
        createElement(
          "div",
          {
            class: ["flex", "justify-center", "items-center", "gap-2"],
          },
          [
            createElement("i", {
              class: ["bi bi-plus", ...styleIcon],
            })
          ]
        ),
      ]
    ),
    search
  ]
);