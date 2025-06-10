import { createElement } from "../component/components";

export const errorOutput = createElement(
  "span",
  { class: ["text-red-700", "my-px"] },
  createElement("p", { class: "text-red" })
);

export const errorOutputPays = createElement(
  "span",
  { class: ["text-red-700", "my-px"] },
  createElement("p", { class: "text-red" })
);