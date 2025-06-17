import {
  updateUserAbout,
  updateUserAvatar,
  updateUserName,
  uploadToImgBB,
} from "../../services/profile";
import { getUser } from "../../services/user";
import { createElement } from "../components";

const styleIcon = ["cursor-pointer", "text-white", "text-2xl", "px-1"];

const icons = ["bi bi-pencil", "bi bi-emoji-neutral", "bi bi-check-lg"];

export const showUsername = createElement(
  "span",
  { class: ["text-white", "text-3lg"] },
  "Le zombie username"
);

const usernameStatic = createElement(
  "div",
  { class: ["flex", "justify-between"] },
  [
    showUsername,
    createElement("i", {
      class: [icons[0], "text-white", "text-2xl"],
      onclick: () => {
        showUsernameInput();
      },
    }),
  ]
);

export const showUserValue = createElement("input", {
  class: [
    "text-white",
    "w-full",
    "p-2",
    "bg-[#0c1317]",
    "outline-none",
    "border-b-2",
    "border-green-600",
  ],
  type: "text",
});

const usernameInput = createElement(
  "div",
  { class: ["flex", "justify-between", "w-full"] },
  [
    createElement("form", { class: ["flex-1"] }, showUserValue),
    createElement("div", { class: ["flex", "justify-between"] }, [
      createElement("i", {
        class: [icons[1], ...styleIcon],
      }),
      createElement("i", {
        class: [icons[2], ...styleIcon],
        type: "submit",
        onclick: () => {
          const value = showUserValue.value;
          if (value != getUser().name) {
            showUsername.textContent = value;
            updateUserName(value);
          }
          showUsernameStatic();
        },
      }),
    ]),
  ]
);

export const showVAbout = createElement(
  "span",
  { class: ["text-white", "text-3lg", , "flex", "items-center"] },
  "About"
);

const username = createElement("div", {}, usernameStatic);

const aboutStatic = createElement(
  "div",
  { class: ["flex", "justify-between", "w-full"] },
  [
    showVAbout,
    createElement("i", {
      class: [icons[0], ...styleIcon],
      onclick: () => {
        showAboutInput();
      },
    }),
  ]
);

export const showAboutValue = createElement("input", {
  class: [
    "text-white",
    "w-full",
    "p-2",
    "bg-[#0c1317]",
    "outline-none",
    "border-b-2",
    "border-green-600",
  ],
  type: "text",
});

const aboutImput = createElement(
  "div",
  { class: ["flex", "justify-between", "w-full"] },
  [
    createElement("form", { class: ["flex-1"] }, showAboutValue),
    createElement("div", { class: ["flex", "justify-between"] }, [
      createElement("i", {
        class: [icons[1], ...styleIcon],
      }),
      createElement("i", {
        class: [icons[2], ...styleIcon],
        onclick: () => {
          const value = showAboutValue.value;
          if (value != getUser().about) {
            showVAbout.textContent = value;
            updateUserAbout(value);
          }
          showAboutStatic();
        },
      }),
    ]),
  ]
);

const about = createElement("div", {}, aboutStatic);

// const fileInput = createElement("input", {
//   type: "file",
//   accept: "image/*",
//   class: ["hidden"],
//   onChange: (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         avatarImg.src = reader.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   },
// });

const fileInput = createElement("input", {
  type: "file",
  accept: "image/*",
  class: ["hidden"],
  onChange: (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToImgBB(file)
        .then((imageUrl) => {
          updateUserAvatar(imageUrl);
        })
        .catch((err) => {
          console.error("Erreur pendant l’upload ou la mise à jour :", err);
        });
    }
  },
});

export const avatarImg = createElement("img", {
  src: `https://avatars.githubusercontent.com/u/12345678?v=4`,
  alt: "User Avatar",
  class: [
    "rounded-full",
    "w-80",
    "h-80",
    "object-cover",
    "transition-all",
    "duration-300",
  ],
});

const overlay = createElement(
  "div",
  {
    class: [
      "absolute",
      "inset-0",
      "bg-black",
      "bg-opacity-60",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "opacity-0",
      "hover:opacity-100",
      "transition-opacity",
      "duration-300",
      "rounded-full",
      "cursor-pointer",
    ],
    onClick: () => fileInput.click(),
  },
  [
    createElement("i", {
      class: ["bi", "bi-camera", "text-white", "text-4xl", "mb-2"],
    }),
    createElement(
      "span",
      {
        class: ["text-white", "text-sm", "text-center"],
      },
      "Cliquez pour changer votre photo"
    ),
  ]
);

const avatarContainer = createElement(
  "div",
  {
    class: ["relative", "w-80", "h-80"],
  },
  [avatarImg, overlay]
);

export const profile = createElement(
  "div",
  {
    class: ["p-5"],
  },
  [
    createElement(
      "h1",
      {
        class: ["text-3xl", "text-white"],
      },
      "Profile"
    ),
    createElement(
      "div",
      {
        class: ["h-96", "flex", "justify-center", "items-center"],
      },
      avatarContainer
    ),
    fileInput,
    createElement("div", { class: ["flex", "flex-col", "gap-4"] }, [
      createElement(
        "h2",
        { class: ["text-green-600", "text-2xl"] },
        "Your name"
      ),
      username,
    ]),
    createElement(
      "div",
      { class: ["text-white", "text-3lg", "py-5"] },
      "This is not your username or PIN. This name will be visible to your WhatsApp contacts"
    ),
    createElement("div", { class: ["flex", "flex-col", "gap-4"] }, [
      createElement("h2", { class: ["text-green-600", "text-2xl"] }, "About"),
      about,
    ]),
  ]
);

function showAboutInput() {
  about.innerHTML = "";
  about.appendChild(aboutImput);
}
function showAboutStatic() {
  about.innerHTML = "";
  about.appendChild(aboutStatic);
}

function showUsernameStatic() {
  username.innerHTML = "";
  username.appendChild(usernameStatic);
}

function showUsernameInput() {
  username.innerHTML = "";
  username.appendChild(usernameInput);
}
