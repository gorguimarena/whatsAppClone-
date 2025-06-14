import { discussionContactsContainer } from "./chats";
import { createElement } from "../components";
import { getNormalConversationSummaries } from "../../services/conversations";
import { loadDiscussionWith, showMessage } from "../../services/discussion";
import { userId } from "./space";
import { isSelected, setSelected } from "../side-bar/actionsSideBar";


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


function createContactItem(item) {
  const isSelected = selectedContactId === item.id;

  const wrapperClass = [
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

  return createElement(
    "div",
    { onClick: () => switchContact(item), class: wrapperClass },
    [
      createElement(
        "div",
        { class: ["p-2", "flex", "gap-3", "items-center", "text-white"] },
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
            { class: ["text-xs", "text-white", "opacity-50"] },
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

export function renderDiscussionContacts() {
  if (currentIntervalIdContact) {
    clearInterval(currentIntervalIdContact);
    currentIntervalIdContact = null;
  }

  currentIntervalIdContact = setInterval(() => {
    const list = getNormalConversationSummaries(userId);
    discussionContactsContainer.innerHTML = "";
    list.map(createContactItem).forEach(el =>
      discussionContactsContainer.appendChild(el)
    );
    console.log("Liste mise à jour");
  }, 1000);
}



export function renderGroupDiscussions(list, selectedId = null) {
  discussionContactsContainer.innerHTML = "";
  const elements = list.map((item) => createContactItem(item, selectedId));
  elements.forEach((el) => discussionContactsContainer.appendChild(el));
}

export function renderArchivedDiscussions(list, selectedId = null) {
  discussionContactsContainer.innerHTML = "";
  const elements = list.map((item) => createContactItem(item, selectedId));
  elements.forEach((el) => discussionContactsContainer.appendChild(el));
}
