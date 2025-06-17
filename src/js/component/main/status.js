import { createElement } from "../components";
import { getUser, getUsers } from "../../services/user";
import { uploadToImgBB } from "../../services/profile";
import { BASE_URL, STATUSES_RESSOURCE } from "../../../../config/config";
import { userId } from "./space";

export const styleIcon = ["cursor-pointer", "text-white", "text-2xl", "px-1"];

const statusLis = [
  {
    content: [
      {
        type: "text",
        value: "Status 1",
      },
      {
        type: "icon",
        value: "Status 2",
      },
      {
        type: "icon",
        value: "Status 3",
      },
    ],
    username: "User 1",
    time: "10:00 AM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 4",
      },
      {
        type: "icon",
        value: "Status 5",
      },
      {
        type: "icon",
        value: "Status 6",
      },
    ],
    username: "User 2",
    time: "11:00 AM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
];

function saveStatus(userId, content) {
  if (!content.length) {
    alert("Aucun contenu à enregistrer.");
    return;
  }

  const newStatus = {
    userId,
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
    content,
  };

  return fetch(`${BASE_URL}/${STATUSES_RESSOURCE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStatus),
  }).then((res) => {
    if (!res.ok) throw new Error("Erreur enregistrement status");
    console.log("Status enregistré !");
  });
}

export function addStatus({ file = null, text = "", userId }) {
  const content = [];

  if (text && text.trim()) {
    content.push({
      type: "text",
      value: text.trim(),
    });
  }

  if (file) {
    const type = file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("video/")
      ? "video"
      : null;

    if (!type) {
      alert("Seules les images et vidéos sont acceptées.");
      return;
    }

    return uploadToImgBB(file)
      .then((url) => {
        content.push({ type, value: url });

        return saveStatus(userId, content);
      })
      .catch((err) => {
        console.error("Erreur d'upload :", err);
      });
  }

  return saveStatus(userId, content);
}

const fileInput = createElement("input", {
  type: "file",
  accept: "image/*,video/*",
  class: ["hidden"],
  onChange: (e) => {
    const file = e.target.files[0];
    if (file) {
      addStatus({ file, userId });
    }
  },
});

const bgColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

function getRandomBgColor() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}

const randomColor = getRandomBgColor();

export const statusTextInput = createElement(
  "div",
  {
    class: [
      "absolute",
      "w-full",
      "h-screen",
      randomColor,
      "p-4",
      "flex",
      "flex-col",
      "justify-between",
      "hidden",
    ],
  },
  [
    createElement(
      "div",
      {
        class: ["flex", "justify-between", "flex-1"],
      },
      [
        createElement("i", {
          class: ["bi bi-x-lg", "text-3xl", "cursor-pointer"],
          onclick: () => {
            statusTextInput.classList.toggle("hidden");
          },
        }),
        createElement("div", {}, [
          createElement("i", {
            class: ["bi bi-x-lg", "text-3xl", "mx-2"],
          }),
          createElement("i", {
            class: ["bi bi-x-lg", "text-3xl"],
          }),
        ]),
      ]
    ),
    createElement(
      "form",
      {
        class: ["flex-1", "flex", "flex-col", "justify-between", "text-white"],
        onsubmit: (e) => {
          e.preventDefault();

          const input = e.target.querySelector("input[type='text']");
          const text = input.value.trim();

          if (!text) return;

          addStatus({ file: null, text, userId }).then(() => {
            input.value = "";
            statusTextInput.classList.toggle("hidden");
            console.log("Statut texte envoyé !");
          });
        },
      },
      [
        createElement("input", {
          type: "text",
          placeholder: "Écris ton statut...",
          class: [
            "outline-none",
            "w-full",
            "p-6",
            "bg-transparent",
            "text-white",
            "border-b",
            "text-center",
            "text-3xl",
          ],
        }),

        createElement(
          "div",
          {
            class: ["p-3", "flex", "justify-between", "gap-2", "items-center"],
          },
          [
            createElement(
              "button",
              {
                type: "submit",
                class: [
                  "flex",
                  "items-center",
                  "gap-1",
                  "bg-white",
                  "text-black",
                  "py-2",
                  "px-4",
                  "rounded-full",
                  "font-semibold",
                ],
              },
              [
                createElement("i", { class: ["bi", "bi-person-lines-fill"] }),
                "Status (contact)",
              ]
            ),
            createElement(
              "button",
              {
                type: "submit",
                class: [
                  "w-16",
                  "h-16",
                  "rounded-full",
                  "bg-white",
                  "flex",
                  "items-center",
                  "justify-center",
                  "text-black",
                ],
              },
              createElement("i", { class: ["bi", "bi-send-fill", "text-lg"] })
            ),
          ]
        ),
      ]
    ),
  ]
);

const menuItems = [
  {
    label: "Images Ou videos",
    action: () => {
      fileInput.click();
    },
  },
  {
    label: "Text",
    action: () => {
      statusTextInput.classList.toggle("hidden");
    },
  },
];

const dropdownMenu = createElement("div", {
  class: [
    "absolute",
    "top-full",
    "top-8",
    "rounded",
    "shadow-lg",
    "p-2",
    "z-50",
    "w-52",
    "bg-[#222e35]",
    "grid",
    "text-white",
    "hidden",
  ],
  vFor: {
    each: menuItems,
    render: (item) => {
      return createElement(
        "span",
        {
          class: [
            "p-1",
            "cursor-pointer",
            "rounded",
            "text-lg",
            "bg-[#222e35]",
          ],
          onclick: item.action,
        },
        item.label
      );
    },
  },
});

const myStatus = createElement(
  "div",
  {
    class: ["flex", "items-center", "p-4", "cursor-pointer", "relative"],
    onclick: () => {
      dropdownMenu.classList.toggle("hidden");
    },
  },
  [
    createElement(
      "div",
      {
        class: ["mr-3", "relative", "w-12", "h-12", "rounded-full"],
      },
      [
        createElement("img", {
          class: ["w-12", "h-12", "rounded-full", "mr-3"],
          src: getUser()?.avatar || "avatar",
          alt: "My Status",
        }),
        createElement("i", {
          class: [
            "bi",
            "bi-plus-circle-fill",
            "absolute",
            "text-green-600",
            "text-2xl",
            "-bottom-1",
            "-right-1",
          ],
        }),
      ]
    ),
    createElement("div", { class: ["flex", "flex-col"] }, [
      createElement("span", { class: ["text-white", "text-lg"] }, "My Status"),
      createElement(
        "span",
        { class: ["text-gray-400", "text-sm"] },
        "Tap to add status"
      ),
    ]),
    dropdownMenu,
  ]
);

export const statusListItems = createElement("div", {
  class: ["flex", "flex-col", "gap-2", "mt-4"],
});



const statusItem = createElement(
  "div",
  {
    class: ["overflow-y-auto"],
  },
  [myStatus, statusListItems]
);

export const status = createElement(
  "div",
  {
    class: ["w-full", "h-full", "flex", "flex-col", "gap-2"],
  },
  [
    createElement(
      "div",
      {
        class: ["w-full", "flex", "justify-between", "items-center", "p-6"],
      },
      [
        createElement(
          "h1",
          {
            class: ["text-white", "text-3xl", "font-bold"],
          },
          "Status"
        ),
        createElement(
          "div",
          {
            class: ["flex", "justify-center", "items-center", "gap-2"],
          },
          [
            createElement("i", {
              class: ["bi bi-plus", ...styleIcon],
            }),
            createElement("i", {
              class: ["bi bi-three-dots-vertical", ...styleIcon],
            }),
          ]
        ),
      ]
    ),
    statusItem,
  ]
);
let autoAdvance = null;
let currentStatusIndex = 0;
let currentStatusContent = [];

export function displayUserStatus(user, statusContent) {
  currentStatusIndex = 0;
  currentStatusContent = statusContent;

  showStatus.innerHTML = "";

  const closeBtn = createElement("i", {
    class: ["bi", "bi-x-lg", "text-3xl", "absolute", "top-4", "right-4", "cursor-pointer"],
    onclick: () => {
      showStatus.classList.add("hidden");
      clearInterval(autoAdvance);
    },
  });

  const contentWrapper = createElement("div", {
    class: ["flex-1", "w-full", "flex", "justify-center", "items-center"],
    id: "statusContent",
  });

  const footer = createElement("div", {
    class: ["text-center", "pb-4", "text-white", "text-lg"],
  }, user.name);

  showStatus.append(closeBtn, contentWrapper, footer);
  document.body.appendChild(showStatus);
  showStatus.classList.remove("hidden");

  renderCurrentStatus();

  // Auto défilement
  autoAdvance = setInterval(() => {
    nextStatus();
  }, 4000); // 4 secondes par statut
}

let lastFetchedStatuses = [];

function hasListChanged(newList, oldList) {
  return JSON.stringify(newList) !== JSON.stringify(oldList);
}

function groupStatusesByUser(statuses) {
  const grouped = {};
  statuses.forEach((status) => {
    if (!grouped[status.userId]) grouped[status.userId] = [];
    grouped[status.userId].push(...status.content);
  });
  return grouped;
}

export function renderStatusesFromServer() {
  const users = getUsers() || [];
  const userIds = users.map((u) => Number(u.id));

  fetch(`${BASE_URL}/${STATUSES_RESSOURCE}`)
    .then((res) => res.json())
    .then((allStatuses) => {
      const filteredStatuses = allStatuses.filter((status) =>
        userIds.includes(Number(status.userId))
      );

      // Vérifie si la liste a changé
      if (!hasListChanged(filteredStatuses, lastFetchedStatuses)) return;
      lastFetchedStatuses = filteredStatuses;

      // Regrouper les contenus par userId
      const groupedStatuses = groupStatusesByUser(filteredStatuses);

      // Nettoyer la liste précédente
      statusListItems.innerHTML = "";

      Object.entries(groupedStatuses).forEach(([userId, contents]) => {
        const user = users.find((u) => u.id == userId);
        if (!user) return;

        const statusEl = createElement(
          "div",
          {
            class: [
              "flex",
              "items-center",
              "p-4",
              "cursor-pointer",
              "hover:bg-[#1a2329]",
            ],
            onClick: () => {
              // ⏩ Affichage des statuts de l'utilisateur
              displayUserStatus(user, contents);
            },
          },
          [
            createElement(
              "div",
              {
                class: ["mr-3", "relative", "w-12", "h-12", "rounded-full"],
              },
              [
                createElement("img", {
                  class: ["w-12", "h-12", "rounded-full"],
                  src: user.avatar || "https://via.placeholder.com/48",
                  alt: user.name || "Utilisateur",
                }),
              ]
            ),
            createElement("div", { class: ["flex", "flex-col"] }, [
              createElement(
                "span",
                { class: ["text-white", "text-lg"] },
                user.name || "Nom inconnu"
              ),
              createElement(
                "span",
                { class: ["text-gray-400", "text-sm"] },
                `Voir les statuts (${contents.length})`
              ),
            ]),
          ]
        );

        statusListItems.appendChild(statusEl);
      });
    })
    .catch((err) => {
      console.error("Erreur lors du chargement des statuts :", err);
    });
}

setInterval(renderStatusesFromServer, 5000);


export const showStatus = createElement("div", {
  id: "showStatus",
  class: [
    "absolute",
    "top-0",
    "left-0",
    "w-full",
    "h-screen",
    "p-4",
    "bg-black",
    "text-white",
    "flex",
    "flex-col",
    "justify-between",
    "items-center",
    "hidden",
    "z-50",
  ],
});





function renderCurrentStatus() {
  const content = currentStatusContent[currentStatusIndex];
  const container = showStatus.querySelector("#statusContent");
  container.innerHTML = "";

  let element;
  if (content.type === "image") {
    element = createElement("img", {
      src: content.value,
      class: ["max-w-full", "max-h-full", "rounded-lg"],
    });
  } else if (content.type === "video") {
    element = createElement("video", {
      src: content.value,
      autoplay: true,
      controls: true,
      class: ["max-w-full", "max-h-full", "rounded-lg"],
    });
  } else if (content.type === "text") {
    element = createElement("p", {
      class: ["text-2xl", "text-center"],
    }, content.value);
  }

  container.appendChild(element);
}

function nextStatus() {
  if (currentStatusIndex < currentStatusContent.length - 1) {
    currentStatusIndex++;
    renderCurrentStatus();
  } else {
    showStatus.classList.add("hidden");
    clearInterval(autoAdvance);
  }
}

function previousStatus() {
  if (currentStatusIndex > 0) {
    currentStatusIndex--;
    renderCurrentStatus();
  }
}

showStatus.addEventListener("click", (e) => {
  const width = showStatus.offsetWidth;
  if (e.clientX < width / 2) {
    previousStatus();
  } else {
    nextStatus();
  }
});





