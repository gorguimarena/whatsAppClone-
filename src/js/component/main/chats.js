import { chatsToNewChat } from "../../services/setter";
import { createElement } from "../components";
import { newChats } from "./newChats";

const listDisplay = [
    'All', 'Unread', 'Favorites', 'Groups'
]

export const discussionContactsContainer = createElement(
  "div",
  {
    id: "discussion-contacts-container",
    class: ["w-full", "flex", "flex-col"],
  }
);

const inputSearch = createElement("input", {
  class: [
    "w-full",
    "bg-[#222e35]",
    "border-none",
    "outline-none",
    "rounded-md",
    "p-2",
    "mt-2",
    "text-white",
  ],
  placeholder: "Rechercher un utilisateur par nom ou numéro",
  type: "text",
});

export const chats = createElement(
  "div",
  {
    class: ["w-full", "h-full", "flex", "flex-col", "gap-2", "p-4"],
  },
  [
    createElement(
      "div",
      {
        class: ["w-full", "py-2"],
      },
      [
        createElement(
          "div",
          {
            class: [
              "w-full",
              "flex",
              "justify-between",
              "items-center",
              "py-4",
            ],
          },
          [
            createElement(
              "h1",
              {
                class: ["text-white", "text-4xl", "font-bold"],
              },
              "Chats"
            ),
            createElement(
              "div",
              {
                class: ["flex", "justify-center", "items-center", "gap-2"],
              },
              [
                createElement("i", {
                  class: [
                    "bi bi-folder-plus",
                    "text-white",
                    "text-2xl",
                    "cursor-pointer",
                  ],
                  onclick: ()=>{
                    chatsToNewChat();
                  }
                }),
                createElement("i", {
                  class: [
                    "bi bi-three-dots-vertical",
                    "text-white",
                    "text-2xl",
                    "cursor-pointer",
                    "ml-2",
                  ],
                }),
              ]
            ),
          ]
        ),
        createElement(
          "form",
          {
            class: ["w-full", "py-2"],
          },
          inputSearch
        ),
      ]
    ),
    createElement('div',{
        class: ["w-96", "flex", "justify-between", "items-center", 'gap-0'],
        vFor: {
            each: listDisplay,
            render: (item) =>
                createElement(
                "button",
                {
                    class: [
                    "py-2",
                    "text-left",
                    "bg-[#222e35]",
                    "rounded-full",
                    "text-white",
                    "hover:bg-[#2c3a45]",
                    'px-5',
                    ],
                    onclick: () => {
                    console.log(`Clicked on ${item}`);
                    },
                },
                item
                ),
        }
    }),
    discussionContactsContainer,
  ]
);