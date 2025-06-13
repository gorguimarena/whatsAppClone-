import { getConversations, getNormalConversationSummaries } from "./conversations";
import { discussion, discussionChamp, discussionChampContainer, discussionVide} from "../component/main/discussionChamp";
import { createElement } from "../component/components";
import { getUsers } from "./user";
import { CONVERSATION_RESSOURCE, BASE_URL } from "../../../config/config";
import { getCurrentConversationId } from "../component/main/lister";


export function setAvatarUser(avatar) {
  ElAvatar.textContent = avatar;
}
export function setNameUser(name) {
  ElName.textContent = name;
}
export function setLastMessageUser(message) {
  ElMessage.textContent = message;
}

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
});

const ElName = createElement("span", {
  class: ["text-lg", "font-semibold", "text-black"],
});
const ElMessage = createElement("span", {
  class: ["text-sm", "text-gray-600"],
});

export let selectedDiscussion = {
  contact: null,
  messages: [],
};
export function loadDiscussionWith(conversationId, currentUserId = 1) {
  
  if (conversationId !== getCurrentConversationId()) {
    return;
  }

  const convo = getConversations().find((c) => c.id === conversationId);  

  if (!convo) {
    selectedDiscussion.messages = [];
    discussionChamp.innerHTML = "";
    return;
  }

  const isAtBottom =
    discussionChamp.scrollHeight - discussionChamp.scrollTop <=
    discussionChamp.clientHeight + 50;

  if (convo.isGroup) {
    selectedDiscussion.contact = { id: convo.id, name: convo.name };
  } else {
    const otherUserId = convo.participants.find((id) => id !== currentUserId);
    const contact = getUsers().find((u) => u.id === otherUserId);
    selectedDiscussion.contact = contact;
  }

  selectedDiscussion.messages = Array.isArray(convo.messages)
    ? convo.messages
    : [];

  discussionChamp.innerHTML = "";

  const messagesNodes = discussionPArt(
    selectedDiscussion.messages,
    currentUserId
  );
  messagesNodes.forEach((node) => discussionChamp.appendChild(node));

  if (isAtBottom) {
    scrollToBottom(discussionChamp);
  }
}



function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}



export function discussionPArt(messages = [], currentUserId = 1) {
  if (!Array.isArray(messages)) return [];


  return messages.map((msg) => {
    const isMine = msg.senderId == currentUserId;

    const baseClass = [
      "max-w-[70%]",
      "p-2",
      "rounded-xl",
      isMine
        ? "bg-green-500 text-white self-end"
        : "bg-white text-black self-start",
      "shadow",
      "text-sm",
    ];

    if (msg.type === "audio") {
      return createElement(
        "div",
        { class: baseClass },
        createElement("audio", {
          controls: true,
          src: msg.content,
        })
      );
    }

    return createElement("div", { class: baseClass }, msg.content);
  });
}

export function showMessage(){
  discussion.innerHTML = "";
  discussion.appendChild(discussionChampContainer);
}


export function sendTextMessage(conversationId, senderId, content) {

  return fetch(`${BASE_URL}/${CONVERSATION_RESSOURCE}/${conversationId}`)
    .then(res => res.json())
    .then(convo => {
      const messages = convo.messages || [];

      const newMessage = {
        id: messages.length ? messages[messages.length - 1].id + 1 : 1,
        senderId,
        content,
        type: "text",
        timestamp: new Date().toISOString(),
      };

      return fetch(`${BASE_URL}/${CONVERSATION_RESSOURCE}/${conversationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });
    });
}

export function discusionVider() {
  discussion.innerHTML = "";
  discussion.appendChild(discussionVide);
}