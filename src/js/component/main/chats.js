import { getArchivedConversations, getArchivedConversationSummaries, getGroupConversationSummaries, getNormalConversationSummaries } from "../../services/conversations";
import { discusionVider } from "../../services/discussion";
import { chatsToNewChat } from "../../services/setter";
import { createElement } from "../components";
import { clearCurrentInterval, clearlastRenderedArchivedList, clearlastRenderedGroupList, clearlastRenderedNormalList, createContactItem, renderArchivedDiscussions, renderDiscussionContacts, renderGroupDiscussions } from "./lister";
import { userId } from "./space";

export const inputSearch = createElement("input", {
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

let currentDisplayMode = "normal"; 

function switchToDisplayMode(mode) {
  currentDisplayMode = mode;

  discussionContactsContainer.innerHTML = "";
  clearCurrentInterval();
  discusionVider();

  setupContactSearch(inputSearch, mode);

  if (mode === "normal") {
    renderDiscussionContacts();
  } else if (mode === "group") {
    renderGroupDiscussions();
  } else if (mode === "archived") {
    renderArchivedDiscussions();
  }
}


const listDisplay = [
  {
    label: "All",
    action: () => {
      clearlastRenderedArchivedList();
      clearlastRenderedGroupList();
      switchToDisplayMode("normal")
    },
  },
  {
    label: "Unread",
    action: () => {},
  },
  {
    label: "Favorites",
    action: () => {},
  },
  {
    label: "Groups",
    action: () => {
      clearlastRenderedArchivedList();
      clearlastRenderedNormalList();
      switchToDisplayMode("group")
    },
  },
];

export const discussionContactsContainer = createElement("div", {
  id: "discussion-contacts-container",
  class: ["w-full", "flex", "flex-col"],
});



let currentSearchType = "normal";

export function setupContactSearch(inputEl, type = "normal") {
  currentSearchType = type;

  if (!inputEl.dataset.listenerAttached) {
    inputEl.addEventListener("input", () => {
      const searchTerm = inputEl.value.toLowerCase();
      let list = [];

      if (currentSearchType === "normal") {
        list = getNormalConversationSummaries(userId);
      } else if (currentSearchType === "group") {
        list = getGroupConversationSummaries(userId);
      } else if (currentSearchType === "archived") {
        list = getArchivedConversationSummaries(userId);
      }

      const filtered = list.filter((conv) => {
        return (
          conv.name?.toLowerCase().includes(searchTerm) ||
          conv.phone?.toLowerCase().includes(searchTerm)
        );
      });

      discussionContactsContainer.innerHTML = "";
      filtered.map(createContactItem).forEach((el) => {
        discussionContactsContainer.appendChild(el);
      });
    });

    inputEl.dataset.listenerAttached = "true";
  }
}



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
          clearlastRenderedNormalList();
          clearlastRenderedGroupList();
          switchToDisplayMode("archived")
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
