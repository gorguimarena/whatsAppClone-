import {
  BASE_URL,
  CONVERSATION_RESSOURCE,
  USERS_RESSOURCE,
} from "../../../config/config";
import { filterAndStoreConversationsByUserId } from "./conversations";
import { storeUsers } from "./user";

// export function getGroupDiscussions(currentUserId = 1, conversations) {
//   return conversations
//     .filter(
//       (c) =>
//         c.isGroup && !c.isArchived && c.participants.includes(currentUserId)
//     )
//     .map((c) => {
//       const lastMessage = c.messages[c.messages.length - 1] || {};
//       return {
//         id: c.id,
//         name: c.name,
//         lastMessage: lastMessage.content || "",
//         date: lastMessage.timestamp?.slice(11, 16) || "",
//       };
//     });
// }

// export function getDiscussionContacts(idUser = 1, conversations) {
//   const discussionIds = conversations
//     .filter(
//       (c) => !c.isGroup && c.participants.includes(idUser) && !c.isArchived
//     )
//     .map((c) => {
//       const otherId = c.participants.find((id) => id !== idUser);
//       return { convo: c, otherId };
//     });

//   return discussionIds
//     .map(({ convo, otherId }) => {
//       const user = users.find((u) => u.id === otherId);
//       if (!user) return null;

//       const lastMsg = convo.messages.at(-1);

//       return {
//         id: user.id,
//         name: user.name,
//         contact: user.contact,
//         conversationId: convo.id,
//         lastMessage: lastMsg ? (convo.type ? "Audio" : lastMsg.content) : "",
//         date: lastMsg ? lastMsg.timestamp?.slice(11, 16) : "",
//       };
//     })
//     .filter(Boolean);
// }

// export function getArchivedDiscussions(currentUserId = 1, conversations) {
//   return conversations
//     .filter((c) => c.isArchived && c.participants.includes(currentUserId))
//     .map((c) => {
//       let name = c.name;
//       let id = c.id;

//       if (!c.isGroup) {
//         const otherUserId = c.participants.find((id) => id !== currentUserId);
//         const user = users.find((u) => u.id === otherUserId);
//         name = user?.name || "Inconnu";
//         id = otherUserId;
//       }

//       const lastMessage = c.messages[c.messages.length - 1] || {};
//       return {
//         id,
//         conversationId: c.id,
//         name,
//         lastMessage: lastMessage.content || "",
//         date: lastMessage.timestamp?.slice(11, 16) || "",
//       };
//     });
// }

let isFetching = false;

export function getConversationsToServer(userId) {
  if (isFetching || userId === null) return;
  isFetching = true;

  fetch(`${BASE_URL}/${CONVERSATION_RESSOURCE}`)
    .then((res) => res.json())
    .then((data) => {
      filterAndStoreConversationsByUserId(data, userId);
      console.log("Conversations mises à jour", userId);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      isFetching = false;
    });
}

function isParticipantInConversation(participants, userId) {
  let found = false;

  console.log(typeof userId);
  
  participants.forEach((id) => {
    if (id == userId) {
      found = true;
    }
  });

  return found;
}


let isFetchingUsers = false;
const otherUserIds = new Set();


export function getUsersWithPrivateConversations(userId) {
  if (isFetchingUsers || userId === null) return;
  isFetchingUsers = true;

  const userIdNum = Number(userId);
  console.log('dans id', userIdNum);
  
  const privateConvos = [];

  console.log('Appell');
  

  fetch(`${BASE_URL}/${CONVERSATION_RESSOURCE}`)
    .then((res) => res.json())
    .then((conversations) => {
      // On utilise forEach pour filtrer manuellement
      conversations.forEach((conv) => {
        console.log(conv);
        console.log(" et ", isParticipantInConversation(conv.participants, userId));
        
        
        if (!conv.isGroup && conv.participants.includes(userIdNum)) {
          privateConvos.push(conv);

          conv.participants.forEach((id) => {
            const idNum = Number(id);
            if (idNum != userIdNum) {
              otherUserIds.add(idNum);
            }
          });
        }
      });


      if (otherUserIds.size === 0) {
        storeUsers([]);
        return;
      }
      console.log('Fetch');


      return fetch(`${BASE_URL}/${USERS_RESSOURCE}`);
    })
    .then((res) => res?.json?.())
    .then((users) => {
      if (users) {
        console.log('Appell TO fetch');
        const filteredUsers = users.filter((u) =>
          otherUserIds.has(Number(u.id))
        );


        console.log("Utilisateurs liés à des conversations privées :", filteredUsers);
        storeUsers(filteredUsers);
      }
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des utilisateurs privés :", err);
    })
    .finally(() => {
      isFetchingUsers = false;
    });
}




