import { createElement } from "../components";

export const space = createElement(
  "div",
  {
    class: [
      "w-full",
      "h-screen",
      "flex",
      "items-center",
      "justify-center",
      "bg-gray-100",
    ],
    vShow: false,
  },
  [
    createElement(
      "div",
      {
        class: [
          "bg-white",
          "p-6",
          "rounded-lg",
          "shadow-md",
          "w-full",
          "flex",
          "items-center",
          "justify-center",
          "flex-col",
          "max-w-2xl",
        ],
      },
      [
        createElement(
          "h1",
          { class: ["text-2xl", "font-bold", "mb-4"] },
          "Welcome to Your Space"
        )
      ]
    ),
  ]
);
