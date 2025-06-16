import { discussionContactsContainer } from "./chats";
import { createElement } from "../components";
import {
  getArchivedConversations,
  getArchivedConversationSummaries,
  getConversations,
  getGroupConversationSummaries,
  getGroupDiscussions,
  getNormalConversationSummaries,
} from "../../services/conversations";
import {
  loadDiscussionWith,
  setLastMessageUser,
  setNameUser,
  showMessage,
} from "../../services/discussion";
import { userId } from "./space";
import { isSelected, setSelected } from "../side-bar/actionsSideBar";
import { BASE_URL, CONVERSATION_RESSOURCE } from "../../../../config/config";

function createAvatar(name) {
  const names = name.split(" ");
  let avatar = names[0].charAt(0).toUpperCase();
  if (names.length >= 2) avatar += "-" + names[1].charAt(0).toUpperCase();
  return avatar;
}

let currentIntervalId = null;
let currentIntervalIdContact = null;

let selectedContactId = null;

export let currentConversationId = null;

export function setCurrentConversationId(id) {
  currentConversationId = id;
}

export function getCurrentConversationId() {
  return currentConversationId;
}

function switchContact(item) {
  if (selectedContactId === item.id) return;
  setNameUser(item.name);
  setLastMessageUser(item.lastMessage);
  selectedContactId = item.id;
  currentConversationId = item.id;
  clearInterval(currentIntervalId);

  setSelected(selectedContactId);
  showMessage();

  loadDiscussionWith(selectedContactId, userId);

  currentIntervalId = setInterval(() => {
    loadDiscussionWith(selectedContactId, userId);
  }, 400);
}

function rerenderAfterArchive(item) {
  if (item.isArchived) {
    renderArchivedDiscussions(userId);
  } else if (item.isGroup) {
    renderGroupDiscussions(userId);
  } else {
    renderDiscussionContacts();
  }
}

function toggleArchive(conversationId, shouldArchive = true) {
  return fetch(`${BASE_URL}/${CONVERSATION_RESSOURCE}/${conversationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isArchived: shouldArchive }),
  })
    .then((res) => res.json())
    .catch((err) => console.error("Erreur (dés)archivage :", err));
}

function createContactItem(item) {
  const isSelected = selectedContactId === item.id;

  const wrapperClass = [
    "group", 
    "shadow",
    "flex",
    "gap-1",
    "border-b-2",
    "justify-between",
    "cursor-pointer",
    "hover:bg-[#222e35]",
    "border-[#1a2329]",
    isSelected && "bg-[#222e35]",
  ].filter(Boolean);

  const menu = createElement(
    "div",
    {
      class: [
        "absolute",
        "top-8",
        "right-2",
        "bg-[#2a3942]",
        "text-white",
        "text-sm",
        "p-2",
        "rounded",
        "shadow-md",
        "hidden",
        "z-10",
      ],
      style: { minWidth: "120px" },
    },
    [
      createElement(
        "p",
        {
          class: ["hover:bg-gray-700", "p-2", "rounded", "cursor-pointer"],
          onClick: (e) => {
            e.stopPropagation();
            const shouldArchive = !item.isArchived;

            toggleArchive(item.id, shouldArchive).then(() => {
              if (shouldArchive) {
                if (item.isGroup) {
                  renderGroupDiscussions(userId);
                } else {
                  renderDiscussionContacts();
                }
              } else {
                renderArchivedDiscussions(userId);
              }
            });
          },
        },
        item.isArchived ? "Désarchiver" : "Archiver"
      ),
    ]
  );

  const caretIcon = createElement("i", {
    class: [
      "bi",
      "bi-caret-down-fill",
      "text-white",
      "hidden", 
      "group-hover:block",
      "cursor-pointer",
    ],
    onclick: (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
    },
  });

  return createElement(
    "div",
    { onClick: () => switchContact(item), class: wrapperClass },
    [
      createElement(
        "div",
        {
          class: [
            "p-2",
            "flex",
            "gap-3",
            "items-center",
            "text-white",
            "relative",
            "flex-1",
          ],
        },
        [
          createElement(
            "span",
            {
              class: [
                "w-16",
                "h-16",
                "rounded-full",
                "bg-green-500",
                "p-2",
                "flex",
                "justify-center",
                "items-center",
                "text-white",
              ],
            },
            createAvatar(item.name)
          ),
          createElement("div", { class: ["flex", "flex-col", "gap-1"] }, [
            createElement(
              "span",
              { class: ["text-lg", "font-semibold", "text-white"] },
              item.name
            ),
            createElement(
              "span",
              { class: ["text-sm", "text-gray-400"] },
              item.lastMessage
            ),
          ]),
          createElement("div", { class: ["absolute", "top-2", "right-2"] }, [
            caretIcon,
            menu,
          ]),
        ]
      ),
      createElement(
        "div",
        {
          class: [
            "p-2",
            "flex",
            "flex-col",
            "gap-0",
            "justify-around",
            "items-center",
            "relative",
          ],
        },
        [
          createElement(
            "span",
            {
              class: ["text-xs", "text-white", "opacity-50"],
            },
            item.date
          ),
          createElement("span", {
            class: ["w-2", "h-2", "rounded-full", "bg-green-500"],
          }),
        ]
      ),
    ]
  );
}

export function clearCurrentInterval() {
  if (currentIntervalId) {
    clearInterval(currentIntervalId);
    currentIntervalId = null;
    selectedContactId = null;
  }
}

function renderEmptyStateIfNeeded(list, type = "discussion") {
  discussionContactsContainer.innerHTML = ""; 
  
  if (!list.length) {
    const message = {
      discussion: "Aucune conversation pour le moment.",
      group: "Aucun groupe disponible.",
      archived: "Aucune discussion archivée.",
    }[type] || "Aucune donnée disponible.";

    const emptyMessage = createElement("div", {
      class: [
        "text-center",
        "text-gray-400",
        "p-4",
        "italic",
        "text-sm",
        'w-full'
      ],
    }, message);

    discussionContactsContainer.appendChild(emptyMessage);
    return true;
  }

  return false;
}


let lastRenderedNormalList = [];
let lastRenderedGroupList = [];
let lastRenderedArchivedList = [];

function hasListChanged(newList, oldList) {
  return JSON.stringify(newList) !== JSON.stringify(oldList);
}

const REFRESH_INTERVAL = 1000;

export function renderDiscussionContacts() {
  if (currentIntervalIdContact) {
    clearInterval(currentIntervalIdContact);
    currentIntervalIdContact = null;
  }

  currentIntervalIdContact = setInterval(() => {
    const list = getNormalConversationSummaries(userId);

    if (renderEmptyStateIfNeeded(list, "discussion")) return;


    if (!hasListChanged(list, lastRenderedNormalList)) {
      return;
    }

    lastRenderedNormalList = list;

    discussionContactsContainer.innerHTML = "";
    list
      .map(createContactItem)
      .forEach((el) => discussionContactsContainer.appendChild(el));
  }, REFRESH_INTERVAL);
}

export function renderGroupDiscussions(userId) {
  if (currentIntervalIdContact) {
    clearInterval(currentIntervalIdContact);
    currentIntervalIdContact = null;
  }

  currentIntervalIdContact = setInterval(() => {
    const list = getGroupConversationSummaries(userId);

    if (renderEmptyStateIfNeeded(list, "group")) return;

    if (!hasListChanged(list, lastRenderedGroupList)) return;


    lastRenderedGroupList = list;
    discussionContactsContainer.innerHTML = "";
    list
      .map(createContactItem)
      .forEach((el) => discussionContactsContainer.appendChild(el));
  }, REFRESH_INTERVAL);
}

export function renderArchivedDiscussions(userId) {
  if (currentIntervalIdContact) {
    clearInterval(currentIntervalIdContact);
    currentIntervalIdContact = null;
  }

  currentIntervalIdContact = setInterval(() => {
    const list = getArchivedConversationSummaries(userId);

    if (renderEmptyStateIfNeeded(list, "archived")) return;


    if (!hasListChanged(list, lastRenderedArchivedList)) return;


    lastRenderedArchivedList = list;
    discussionContactsContainer.innerHTML = "";
    list
      .map(createContactItem)
      .forEach((el) => discussionContactsContainer.appendChild(el));
  }, REFRESH_INTERVAL);
}
