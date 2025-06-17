import { getArchivedConversations } from "../../services/conversations";
import { chatsToNewChat } from "../../services/setter";
import { createElement } from "../components";
import { renderArchivedDiscussions, renderDiscussionContacts, renderGroupDiscussions } from "./lister";
const listDisplay = [
  {
    label: "All",
    action: () => {
      renderDiscussionContacts();
    },
  },
  {
    label: "Unread",
    action: () => {
      console.log("Afficher les messages non lus");
    },
  },
  {
    label: "Favorites",
    action: () => {
      console.log("Afficher les messages favoris");
    },
  },
  {
    label: "Groups",
    action: () => {
      renderGroupDiscussions();
    },
  },
];

export const discussionContactsContainer = createElement("div", {
  id: "discussion-contacts-container",
  class: ["w-full", "flex", "flex-col"],
});

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

const menuItems = [
  { label: "New Group", onClick: () => {} },
  { label: "Select Chat", onClick: () => {} },
  { label: "Starred Messages", onClick: () => {} },
  { label: "Log Out", onClick: () => {} },
];

const dropdownMenu = createElement("div", {
  class: [
    "absolute",
    "right-full",
    "top-8",
    "rounded",
    "shadow-lg",
    "p-2",
    "z-50",
    "w-52",
    "bg-[#222e35]",
    "grid",
    "hidden",
  ],
  vFor: {
    each: menuItems,
    render: (item) => {
      return createElement(
        "span",
        {
          class: [
            "p-1",
            "cursor-pointer",
            "rounded",
            "text-sm",
            "bg-[#222e35]",
          ],
        },
        item.label
      );
    },
  },
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
                  onclick: () => {
                    chatsToNewChat();
                  },
                }),
                createElement(
                  "i",
                  {
                    class: [
                      "bi bi-three-dots-vertical",
                      "text-white",
                      "text-2xl",
                      "cursor-pointer",
                      "ml-2",
                      "relative",
                    ],
                    onclick: () => {
                      dropdownMenu.classList.toggle("hidden");
                    },
                  },
                  [dropdownMenu]
                ),
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
    createElement("div", {
      class: ["w-96", "flex", "justify-between", "items-center", "gap-0"],
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
                "px-5",
              ],
              onclick: item.action,
            },
            item.label
          ),
      },
    }),
    createElement(
      "div",
      {
        class: ["flex", "gap-4", "p-4", "text-white", "text-2xl", 'cursor-pointer'],
        onclick: ()=> {
          renderArchivedDiscussions();
        }
      },
      [
        createElement("i", {
          class: ["bi bi-archive", ],
        }),
        createElement("span", {}, "Archive"),
      ]
    ),
    discussionContactsContainer,
  ]
);
