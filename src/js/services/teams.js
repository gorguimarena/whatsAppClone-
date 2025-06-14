export async function createGroupConversation(groupName, participantIds, currentUserId) {
  const newConversation = {
    name: groupName,
    participants: participantIds.map(Number), 
    isGroup: true,
    isArchived: false,
    admins: [currentUserId],
    messages: [
      {
        id: 1,
        senderId: currentUserId,
        content: `Groupe "${groupName}" créé`,
        timestamp: new Date().toISOString()
      }
    ]
  };

  const res = await fetch("http://localhost:3000/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newConversation)
  });

  if (!res.ok) {
    console.error("Erreur lors de la création du groupe");
  } else {
    console.log("Groupe créé avec succès");
  }
}
