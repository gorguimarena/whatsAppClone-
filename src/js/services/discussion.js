export function loadDiscussionWith(conversationId, currentUserId = 1) {
  const convo = conversations.find((c) => c.id === conversationId);

  if (!convo) {
    selectedDiscussion.messages = [];
    discussionChamp.innerHTML = "";
    return;
  }

  if (convo.isGroup) {
    selectedDiscussion.contact = { id: convo.id, name: convo.name };
  } else {
    const otherUserId = convo.participants.find((id) => id !== currentUserId);
    const contact = users.find((u) => u.id === otherUserId);
    selectedDiscussion.contact = contact;
  }

  selectedDiscussion.messages = convo.messages;
  discussionChamp.innerHTML = "";

  const messagesNodes = discussionPArt(
    selectedDiscussion.messages,
    currentUserId
  );
  messagesNodes.forEach((node) => discussionChamp.appendChild(node));
}

export function discussionPArt(messages, currentUserId = 1) {
  return messages.map((msg) => {
    const isMine = msg.senderId === currentUserId;
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

export function setAvatarUser(avatar) {
  ElAvatar.textContent = avatar;
}
export function setNameUser(name) {
  ElName.textContent = name;
}
export function setLastMessageUser(message) {
  ElMessage.textContent = message;
}