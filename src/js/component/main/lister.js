import { discussionContactsContainer } from "./chats";
import { createElement } from "../components";
import {
  getNormalConversationSummaries,
} from "../../services/conversations";
import { loadDiscussionWith, showMessage } from "../../services/discussion";
import { userId } from "./space";
import { setSelected } from "../side-bar/actionsSideBar";

let currentIntervalId = null;


function createAvatar(name) {
  const names = name.split(" ");
  let avatar = names[0].charAt(0).toUpperCase();
  if (names.length >= 2) avatar += "-" + names[1].charAt(0).toUpperCase();
  return avatar;
}

function createContactItem(item, selectedId) {
  const isSelected = selectedId === item.id;
  console.log(
    `Creating contact item for: ${item.name} with ID: ${item.id}, selected: ${isSelected}`
  );

  const wrapperClass = [
    "shadow",
    "flex",
    "gap-1",
    "border-b-2",
    "justify-between",
    "cursor-pointer",
    isSelected ? "bg-[#222e35]" : "",
    "hover:bg-[#222e35]",
    "border-[#1a2329]"
  ];

  return createElement(
    "div",
    {
      onClick: () => {
        selectedId = item.id;
        renderDiscussionContacts(selectedId);
        showMessage();
        setSelected(selectedId);
        
        if (selectedId) {
          if (currentIntervalId) {
            clearInterval(currentIntervalId);
            currentIntervalId = null;
          }

          currentIntervalId = setInterval(() => {
            loadDiscussionWith(selectedId, userId);
          }, 300);
        }
       
      },
      class: wrapperClass,
    },
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
              { class: ["text-sm", "text-gray-600", "text-white"] },
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
            { class: ["text-lg", "font-semibold", "text-white", "opacity-50"] },
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

export function renderGroupDiscussions(list, selectedId = null) {
  discussionContactsContainer.innerHTML = "";
  const elements = list.map((item) => createContactItem(item, selectedId));
  elements.forEach((el) => discussionContactsContainer.appendChild(el));
}

export function renderDiscussionContacts(selectedId = 0) {
  const list = getNormalConversationSummaries(userId);
  console.log(list);

  discussionContactsContainer.innerHTML = "";
  const elements = list.map((item) => createContactItem(item, selectedId));
  elements.forEach((el) => discussionContactsContainer.appendChild(el));
}

export function renderArchivedDiscussions(list, selectedId = null) {
  discussionContactsContainer.innerHTML = "";
  const elements = list.map((item) => createContactItem(item, selectedId));
  elements.forEach((el) => discussionContactsContainer.appendChild(el));
}
