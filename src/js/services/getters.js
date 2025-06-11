export function getGroupDiscussions(currentUserId = 1) {
  return conversations
    .filter(
      (c) =>
        c.isGroup && !c.isArchived && c.participants.includes(currentUserId)
    )
    .map((c) => {
      const lastMessage = c.messages[c.messages.length - 1] || {};
      return {
        id: c.id,
        name: c.name,
        lastMessage: lastMessage.content || "",
        date: lastMessage.timestamp?.slice(11, 16) || "",
      };
    });
}

export function getDiscussionContacts(idUser = 1) {
  const discussionIds = conversations
    .filter(
      (c) => !c.isGroup && c.participants.includes(idUser) && !c.isArchived
    )
    .map((c) => {
      const otherId = c.participants.find((id) => id !== idUser);
      return { convo: c, otherId };
    });

  return discussionIds
    .map(({ convo, otherId }) => {
      const user = users.find((u) => u.id === otherId);
      if (!user) return null;

      const lastMsg = convo.messages.at(-1);

      return {
        id: user.id,
        name: user.name,
        contact: user.contact,
        conversationId: convo.id,
        lastMessage: lastMsg ? (convo.type ? "Audio" : lastMsg.content) : "",
        date: lastMsg ? lastMsg.timestamp?.slice(11, 16) : "",
      };
    })
    .filter(Boolean);
}

export function getArchivedDiscussions(currentUserId = 1) {
  return conversations
    .filter((c) => c.isArchived && c.participants.includes(currentUserId))
    .map((c) => {
      let name = c.name;
      let id = c.id;

      if (!c.isGroup) {
        const otherUserId = c.participants.find((id) => id !== currentUserId);
        const user = users.find((u) => u.id === otherUserId);
        name = user?.name || "Inconnu";
        id = otherUserId;
      }

      const lastMessage = c.messages[c.messages.length - 1] || {};
      return {
        id,
        conversationId: c.id,
        name,
        lastMessage: lastMessage.content || "",
        date: lastMessage.timestamp?.slice(11, 16) || "",
      };
    });
}