import { chatsToNewChat } from "../../services/setter";
import { createGroupConversation } from "../../services/teams";
import { getUser } from "../../services/user";
import { createElement } from "../components";
import { styleIconOptions } from "./setting";
import { userId } from "./space";


const selectedUserIds = new Set();

const searchInput = createElement("input", {
  type: "text",
  class: [
    "w-full",
    "border-[#1a2329]",
    "border-b-2",
    "bg-[#0c1317]",
    "outline-none",
    "p-1",
    "text-white",
    "text-2lg",
  ],
  placeholder: "Search name or number",
});

const saver = createElement(
  "div",
  {
    id: "saver",
    class: ["h-24", "w-full", "hidden", "flex", "justify-center", "items-center"],
  },
  createElement(
    "button",
    {
      class: [
        "bg-green-500",
        "text-white",
        "px-6",
        "py-3",
        "rounded-full",
        "text-lg",
        "shadow-md",
        "flex",
        "items-center",
        "gap-2",
      ],
      onclick: async () => {
        alert('Phase de dev !!');
        return;

        const participantIds = [...selectedUserIds];

        await createGroupConversation(groupName, participantIds, userId);

        alert("Groupe créé avec succès !");
      },
    },
    [
      createElement("i", {
        class: ["bi", "bi-check-circle", "text-xl"],
      }),
      createElement("span", {}, "Créer le groupe"),
    ]
  )
);


const userList = createElement("div", {
  class: [
    "flex",
    "flex-col",
    "overflow-y-auto",
    "max-h-[400px]",
    "scrollbar-thin",
    "scrollbar-thumb-gray-700",
  ],
});




function renderUserItem(user) {
  if (selectedUserIds.has(user.id)) return;

  const userItem = createElement(
    "div",
    {
      class: [
        "flex",
        "items-center",
        "gap-4",
        "p-3",
        "hover:bg-[#1a2329]",
        "cursor-pointer",
      ],
      onclick: () => {
        selectedUserIds.add(user.id);
        userList.removeChild(userItem);
        addToSelectedList(user);

        const saver = document.getElementById("saver");
        if (saver) saver.classList.remove("hidden");
      },
    },
    [
      createElement("img", {
        src: user.avatar,
        class: ["rounded-full", "w-14", "h-14"],
      }),
      createElement("div", { class: ["flex", "flex-col", "text-white"] }, [
        createElement("span", { class: ["text-lg"] }, user.name),
        createElement(
          "span",
          { class: ["text-sm", "text-gray-400"] },
          user.about || ""
        ),
      ]),
    ]
  );

  userList.appendChild(userItem);
}


const listSelected = createElement("div", {
  class: [
    "flex",
    "flex-wrap",
    "gap-2",
    "px-4",
    "py-2",
    "max-h-[120px]",
    "overflow-y-auto",
  ],
});

function renderUserList(users) {
  userList.innerHTML = "";
  users.forEach(renderUserItem);
}


export function setupUserSearchInSelectableList(users) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = users.filter((user) => {
      return (
        !selectedUserIds.has(user.id) &&
        (user.name.toLowerCase().includes(searchTerm) ||
          user.phone?.toLowerCase().includes(searchTerm))
      );
    });

    userList.innerHTML = "";
    filtered.forEach(renderUserItem);
  });

  // première fois : afficher tous les users
  renderUserList(users);
}



function addToSelectedList(user) {
  const selectedItem = createElement(
    "div",
    {
      class: [
        "flex",
        "items-center",
        "gap-2",
        "bg-[#1a2329]",
        "text-white",
        "px-2",
        "py-1",
        "rounded-xl",
        "cursor-pointer",
      ],
      onclick: () => {
        // Désélectionner
        selectedUserIds.delete(user.id);
        listSelected.removeChild(selectedItem);
        renderUserItem(user); // le réafficher dans la liste principale

        // Cacher le bouton save si plus de sélection
        if (selectedUserIds.size === 0) {
          const saver = document.getElementById("saver");
          if (saver) saver.classList.add("hidden");
        }
      },
    },
    [
      createElement("img", {
        src: user.avatar,
        class: ["w-6", "h-6", "rounded-full"],
      }),
      createElement("span", { class: ["text-sm"] }, user.name),
      createElement("i", { class: ["bi", "bi-x-lg", "text-xs"] }),
    ]
  );

  listSelected.appendChild(selectedItem);
}


const newTeam = createElement(
  "div",
  {
    class: ["h-full"],
  },
  [
    // Header
    createElement(
      "div",
      {
        class: ["mx-4", "my-5", "flex", "gap-3", "items-center"],
      },
      [
        createElement("i", {
          class: [
            "text-white",
            "text-4xl",
            "font-bold",
            "bi bi-arrow-left",
            "my-5",
            "cursor-pointer",
          ],
          onclick: () => {
            chatsToNewChat();
          },
        }),
        createElement(
          "span",
          {
            class: ["text-white", "text-2xl", "mx-4", "my-5"],
          },
          "Add group members"
        ),
      ]
    ),

    // Zone des utilisateurs sélectionnés
    listSelected,

    // Search bar
    createElement(
      "div",
      {
        class: ["mx-6"],
      },
      searchInput
    ),

    // Barre alphabétique
    createElement(
      "div",
      {
        class: [...styleIconOptions, "border-[#1a2329]", "border-b-2", "py-6"],
      },
      createElement(
        "span",
        {
          class: ["text-2xl", "text-green-500"],
        },
        "A"
      )
    ),

    // Liste de contacts
    userList,

    // Bouton save
    saver,
  ]
);


export { newTeam };
