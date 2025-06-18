import { getUsers } from "./user";

export function storeConversations(conversations) {
  localStorage.setItem("conversations", JSON.stringify(conversations));
}
export function getConversations() {
  return JSON.parse(localStorage.getItem("conversations")) || [];
}

export function clearConversations() {
  localStorage.removeItem("conversations");
}

export function storeArchivedConversations(conversations) {
  localStorage.setItem("archivedConversations", JSON.stringify(conversations));
}
export function getArchivedConversations() {
  return JSON.parse(localStorage.getItem("archivedConversations")) || [];
}
export function clearArchivedConversations() {
  localStorage.removeItem("archivedConversations");
}

export function storeGroupDiscussions(groups) {
  localStorage.setItem("groupDiscussions", JSON.stringify(groups));
}
export function getGroupDiscussions() {
  return JSON.parse(localStorage.getItem("groupDiscussions")) || [];
}

export function clearGroupDiscussions() {
  localStorage.removeItem("groupDiscussions");
}

export function users() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
export function storeUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
export function clearUsers() {
  localStorage.removeItem("users");
}

export function getNormalConversationSummaries(userId) {
  const conversations = JSON.parse(
    localStorage.getItem("conversations") || "[]"
  );

  return conversations
    .map((conv) => formatConversationSummary(conv, userId));
}

export function getGroupConversationSummaries(userId) {
  const groupConversations = JSON.parse(
    localStorage.getItem("groupDiscussions") || "[]"
  );  

  return groupConversations
    .map((conv) => formatConversationSummary(conv, userId));
}

export function getArchivedConversationSummaries(userId) {
  const archivedConversations = JSON.parse(
    localStorage.getItem("archivedConversations") || "[]"
  );

  return archivedConversations
    .map((conv) => formatConversationSummary(conv, userId));
}

function formatConversationSummary(conv, userId) {
  const lastMessage = conv.messages?.[conv.messages.length - 1] || {};

  let preview;
  if (lastMessage.type === "audio" || lastMessage.type === "voice") {
    preview = "Vocal";
  } else {
    preview = lastMessage.content || "";
  }

  return {
    id: conv.id,
    name: getConversationName(conv, userId),
    lastMessage: preview,
    date: lastMessage.timestamp ? lastMessage.timestamp.slice(11, 16) : "",
    participants: conv.participants,
    isGroup: !!conv.isGroup,
    isArchived: !!conv.isArchived,
  };
}

function getConversationName(conv, userId) {
  if (conv.isGroup && conv.nameTeam) {
    return conv.nameTeam;
  }

  const users = getUsers();  
  const otherId = conv.participants.find((id) => id != userId);
  const otherUser = users.find((user) => String(user.id) == String(otherId));

  return otherUser ? otherUser.name : "Inconnu";
}

let lastUserConversations = [];

export function filterAndStoreConversationsByUserId(conversations, userId) {
  const userIdNum = Number(userId);

  const userConversations = conversations.filter((conv) =>
    conv.participants.includes(userIdNum)
  );

  // Compare avec la dernière version pour éviter de restocker inutilement
  if (JSON.stringify(userConversations) === JSON.stringify(lastUserConversations)) {
    return; // Pas de changement, on évite de re-stocker
  }

  lastUserConversations = userConversations;

  const archived = [];
  const groups = [];
  const normal = [];

  for (const conv of userConversations) {
    if (conv.isArchived) {
      archived.push(conv);
    } else if (conv.isGroup) {
      groups.push(conv);
    } else {
      normal.push(conv);
    }
  }

  storeConversations(normal);
  storeArchivedConversations(archived);
  storeGroupDiscussions(groups);
}



