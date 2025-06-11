import { createElement } from "../components";

const ElAvatar = createElement("div", {
  class: [
    "rounded-full",
    "bg-blue-500",
    "w-16",
    "h-16",
    "flex",
    "justify-center",
    "items-center",
  ],
}, createElement('i', {class: [
    "text-6xl",
    "bi bi-person-fill",
    "text-gray-300"
]}));

const ElName = createElement("span", {
  class: ["text-lg", "font-semibold", "text-white"],
}, 'Gorgui Marena');
const ElMessage = createElement("span", {
  class: ["text-sm", "text-gray-600"],
}, 'The last message of gorgui');

export const discussionChamp = createElement("div", {
  id: "discussion-champ",
  class: [
    "w-full",
    "overflow-y-auto",
    "p-2",
    "flex",
    "flex-col",
    "gap-2",
    "flex-[10_1%]",
    "overflow-x-hidden",
    "overflow-y-auto",
  ],
});

export const discussion = createElement(
  "div",
  {
    class: [
      "h-full",
      "flex-[5_1_0%]",
      "flex",
      "flex-col",
      "justify-between",
      "items-center",
      "gap-2",
      "p-2",
    ],
  },
  [
    createElement(
      "div",
      {
        class: ["w-full", "flex", "justify-between", "p-2"],
      },
      [
        createElement(
          "div",
          {
            class: ["flex", "justify-center", "items-center", "bg-[#222e35]", "gap-2"],
          },
          [
            ElAvatar,
            createElement(
              "div",
              {
                class: ["flex", "flex-col", "gap-2", "ml-2"],
              },
              [ElName, ElMessage]
            ),
          ]
        ),
        createElement(
          "div",
          {
            class: ["text-white", "text-2xl"],
            onClick: () => {
              discussionChamp.innerHTML = "";
            },
          },
          [
            createElement("i", {
              class: ["bi bi-plus", "text-white", "text-3xl", "cursor-pointer"],
            }),
            createElement("i", {
              class: ["bi bi-plus", "text-white", "text-3xl", "cursor-pointer", "p-3"],
            }),
          ]
        ),
      ]
    ),
    discussionChamp,
    createElement(
      "div",
      {
        class: [
          "w-full",
          "flex-[1_1_0%]",
          "p-3",
          "gap-2",
          "bg-[#222e35]",
          "flex",
          "items-center",
        ],
      },
      [
        createElement(
          "div",
          {
            class: ["text-white", "rounded-md", "hover:bg-blue-600", "p-2"],
          },
          createElement("i", {
            class: ["bi bi-plus", "text-white", "text-3xl"],
          })
        ),
        createElement("input", {
          type: "text",
          placeholder: "Type your message...",
          class: [
            "p-4",
            "bg-gray-800",
            "text-white",
            "rounded-md",
            "focus:outline-none",
            "flex-1",
          ],
        }),
        createElement(
          "div",
          {
            class: ["text-white", "rounded-md", "hover:bg-blue-600", "p-2"],
          },
          createElement("i", {
            class: ["bi bi-mic", "text-white", "text-3xl"],
          })
        ),
      ]
    ),
  ]
);
