import { createElement } from "../components";
import { BASE_IMG } from "../../../../config/config";

const styleIcon = ["cursor-pointer", "text-white", "text-2xl", 'px-1'];

const icons = [
    'bi bi-pencil',
    'bi bi-emoji-neutral',
    'bi bi-check-lg'
]

const usernameStatic = createElement(
  "div",
  { class: ["flex", "justify-between"] },
  [
    createElement(
      "span",
      { class: ["text-white", "text-3lg"] },
      "Le zombie username"
    ),
    createElement("i", {
      class: [icons[0], "text-white", "text-2xl"],
      onclick: () => {
        showUsernameInput();
      },
    }),
  ]
);

const usernameInput = createElement(
  "div",
  { class: ["flex", "justify-between", "w-full"] },
  [
    createElement(
      "form",
      { class: ["flex-1"] },
      createElement("input", {
        class: [
          "text-white",
          "w-full",
          "p-2",
          "bg-[#0c1317]",
          "outline-none",
          "border-b-2",
          'border-green-600'
        ],
        type: "text",
      })
    ),
    createElement("div", { class: ["flex", "justify-between"] }, [
      createElement("i", {
        class: [icons[1], ...styleIcon],
      }),
      createElement("i", {
        class: [icons[2], ...styleIcon],
        onclick: () => {
            showUsernameStatic();
        },
      }),
    ]),
  ]
);

const username = createElement("div", {}, usernameStatic);

const aboutStatic = createElement(
  "div",
  { class: ["flex", "justify-between", "w-full"] },
  [
    createElement(
      "span",
      { class: ["text-white", "text-3lg", , "flex", "items-center"] },
      "Le zombie username"
    ),
    createElement("i", {
      class: [icons[0], ...styleIcon],
      onclick: () => {
            showAboutInput();
        },
    }),
  ]
);

const aboutImput = createElement(
  "div",
  { class: ["flex", "justify-between", "w-full"] },
  [
    createElement(
      "form",
      { class: ["flex-1"] },
      createElement("input", {
        class: [
          "text-white",
          "w-full",
          "p-2",
          "bg-[#0c1317]",
          "outline-none",
          "border-b-2",
          'border-green-600'
        ],
        type: "text",
      })
    ),
    createElement("div", { class: ["flex", "justify-between"] }, [
      createElement("i", {
        class: [icons[1], ...styleIcon],
      }),
      createElement("i", {
        class: [icons[2], ...styleIcon],
        onclick: () => {
            showAboutStatic();
        },
      }),
    ]),
  ]
);

const about = createElement("div", {}, aboutStatic);

const fileInput = createElement("input", {
  type: "file",
  accept: "image/*",
  class: ["hidden"],
  onChange: (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatarImg.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  },
});

const avatarImg = createElement("img", {
  src: `${BASE_IMG}/Bal.jpeg`,
  alt: "User Avatar",
  class: ["rounded-full", "w-80", "h-80", "object-cover", "transition-all", "duration-300"],
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
