export const countries = [
  { name: "Sénégal", code: "+221", flag: "🇸🇳" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "États-Unis", code: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Royaume-Uni", code: "+44", flag: "🇬🇧" },
  { name: "Allemagne", code: "+49", flag: "🇩🇪" },
  { name: "Espagne", code: "+34", flag: "🇪🇸" },
  { name: "Italie", code: "+39", flag: "🇮🇹" },
  { name: "Maroc", code: "+212", flag: "🇲🇦" },
  { name: "Algérie", code: "+213", flag: "🇩🇿" },
  { name: "Tunisie", code: "+216", flag: "🇹🇳" },
  { name: "Côte d'Ivoire", code: "+225", flag: "🇨🇮" },
  { name: "Mali", code: "+223", flag: "🇲🇱" },
  { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
  { name: "Guinée", code: "+224", flag: "🇬🇳" },
  { name: "Cameroun", code: "+237", flag: "🇨🇲" },
];


export const infoOptions = [
  {
    icon: "bi bi-chat-left-fill",
    text: "Message",
  },
  {
    icon: "bi bi-microsoft-teams",
    text: "Groupes",
  },
  {
    icon: "bi bi-shuffle",
    text: "Diffusion",
  },
  {
    icon: "bi bi-calendar-plus-fill",
    text: "Archives",
  },
  {
    icon: "bi bi-plus-lg",
    text: "Nouveau",
  },
  {
    icon: "bi bi-arrow-bar-left",
    text: "Deconnexion",
  },
];

export const optionHandlers = {
  Message: () => {
    renderContactsList(getDiscussionContacts(idUser), false, false);
  },

  Groupes: () => {
    renderContactsList(getGroupDiscussions(idUser), true, false);
  },

  Diffusion: () => {
    diffusionChamps.style.display = "flex";
  },

  Archives: () => {
    renderContactsList(getArchivedDiscussions(idUser), null, false, true);
  },

  Nouveau: () => {
    newContact.style.display = "flex";
  },
  Deconnexion: () => {
    idUser = null;
    location.reload();
  },
};



export function renderContactsList(
  list,
  withGroupButton = false,
  selectedId = null,
  showArchived = false
) {
  discussionContactsContainer.innerHTML = "";

  if (withGroupButton) {
    populateGroupMembers();
    const addGroupButton = createElement(
      "button",
      {
        class: [
          "bg-blue-600",
          "text-white",
          "p-2",
          "rounded",
          "font-bold",
          "hover:bg-blue-700",
        ],
        onclick: () => {
          createGroupForm.style.display = "flex";
        },
      },
      "➕ Nouveau groupe"
    );

    discussionContactsContainer.appendChild(addGroupButton);
  }

  const elements = list.map((item) => {
    const isSelected = selectedId === item.id;

    const wrapperClass = [
      "p-2",
      "rounded",
      "shadow",
      "mb-2",
      "flex",
      "gap-1",
      "border",
      "border-gray-200",
      "justify-between",
      "cursor-pointer",
      isSelected ? "bg-blue-100 border-blue-400" : "bg-white",
    ];
    const names = item.name.split(" ");
    let avatar = names[0].charAt(0).toUpperCase();
    console.log(names);

    console.log(names.length);

    if (names.length >= 2) {
      avatar += "-" + names[1].charAt(0).toUpperCase();
    }

    return createElement(
      "div",
      {
        onClick: () => {
          selectedConversationId = item.conversationId;
          selectedUserId = item.id;
          setAvatarUser(avatar);
          setNameUser(item.name);
          setLastMessageUser(
            commencePar(item.lastMessage, "blob:http://localhost:") || commencePar(item.lastMessage, 'data:audio/webm;base64')
              ? "Audio"
              : item.lastMessage
          );
          loadDiscussionWith(item.conversationId, idUser);
          renderContactsList(list, withGroupButton, item.id, showArchived);
        },
        class: wrapperClass,
      },
      [
        createElement(
          "div",
          {
            class: ["p-2", "flex", "gap-1", "items-center"],
          },
          [
            createElement(
              "span",
              {
                class: [
                  "w-10",
                  "h-10",
                  "rounded-full",
                  "bg-green-500",
                  "p-2",
                  "flex",
                  "justify-center",
                  "items-center",
                  "text-white",
                ],
              },
              avatar
            ),
            createElement(
              "div",
              {
                class: ["flex", "flex-col", "gap-1"],
              },
              [
                createElement(
                  "span",
                  {
                    class: ["text-lg", "font-semibold", "text-black"],
                  },
                  item.name
                ),
                createElement(
                  "span",
                  {
                    class: ["text-sm", "text-gray-600"],
                  },
                  commencePar(item.lastMessage, "blob:http://localhost:") || commencePar(item.lastMessage, 'data:audio/webm;base64')
                    ? "Audio"
                    : item.lastMessage
                ),
              ]
            ),
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
                class: ["text-lg", "font-semibold", "text-black", "opacity-50"],
              },
              item.date
            ),

            showArchived
              ? createElement("i", {
                  class: [
                    "bi",
                    "bi-file-earmark-zip",
                    "text-xl",
                    "text-red-500",
                    "cursor-pointer",
                  ],
                  onclick: (e) => {
                    e.stopPropagation();
                    const conv = conversations.find(
                      (c) => c.id === item.conversationId
                    );
                    if (conv) {
                      conv.isArchived = false;
                      localStorage.setItem(
                        "conversations",
                        JSON.stringify(conversations)
                      );
                      renderContactsList(
                        conversations
                          .filter((c) => c.isArchived)
                          .map((c) => ({
                            ...c,
                            id: c.participants.find((pid) => pid !== 1),
                            conversationId: c.id,
                            name:
                              users.find(
                                (u) =>
                                  u.id ===
                                  c.participants.find((pid) => pid !== 1)
                              )?.name || "Inconnu",
                            lastMessage:
                              c.messages[c.messages.length - 1]?.content || "",
                            date:
                              c.messages[
                                c.messages.length - 1
                              ]?.timestamp?.slice(11, 16) || "",
                          })),
                        false,
                        null,
                        true
                      );
                    }
                  },
                })
              : withGroupButton
              ? createElement(
                  "div",
                  {
                    class: ["relative", "flex", "gap-3"],
                  },
                  [
                    createElement("i", {
                      class: [
                        "bi bi-node-plus-fill",
                        "text-blue-600",
                        "text-xl",
                        "cursor-pointer",
                      ],
                      onclick: (e) => {
                        e.stopPropagation();
                        showAddMembersForm(item.id);
                      },
                    }),
                    createElement("i", {
                      class: [
                        "bi bi-transparency",
                        "text-blue-600",
                        "text-xl",
                        "cursor-pointer",
                      ],
                      onclick: (e) => {
                        e.stopPropagation();
                        showMembersForm(item.id);
                      },
                    }),
                  ]
                )
              : createElement("span", {
                  class: ["w-2", "h-2", "rounded-full", "bg-green-500"],
                }),
          ]
        ),
      ]
    );
  });

  elements.forEach((el) => discussionContactsContainer.appendChild(el));
}

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