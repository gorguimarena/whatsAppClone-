import { createElement } from "../components";
import { BASE_IMG } from "../../../../config/config";
import { disconnected } from "../../services/connect";
import { getUser } from "../../services/user";

export const styleIconOptions = ["text-white", "text-3xl", "px-6"];

const optionsAction = [
  {
    name: "Account",
    icon: "bi bi-person",
    action: () => {},
  },
  {
    name: "Privacy",
    icon: "bi bi-shield-lock",
    action: () => {},
  },
  {
    name: "Chats",
    icon: "bi bi-chat-left-text",
    action: () => {},
  },
  {
    name: "Notifications",
    icon: "bi bi-bell-fill",
    action: () => {},
  },
  {
    name: "Keyboard Shortcuts",
    icon: "bi bi-keyboard",
    action: () => {},
  },
  {
    name: "Help",
    icon: "bi bi-question-circle",
    action: () => {},
  },
  {
    name: "Log out",
    icon: "bi bi-box-arrow-right",
    action: disconnected,
  },
];

const options = createElement("div", {
  class: ["flex", "flex-col"],
  vFor: {
    each: optionsAction,
    render: (item) => {
        const isLogout = item.name == "Log out";
        console.log("boolen : ", item.name == "Log out");
        
      return createElement(
        "div",
        {
          class: [
            "flex",
            "justify-start",
            "items-center",
            "hover:bg-[#1a2329]",
            "gap-2",
            "cursor-pointer",
          ],
          onclick: item.action,
        },
        [
          createElement("i", {
            class: [item.icon, ...styleIconOptions, isLogout ? "text-red-500" : ""],
          }),
          createElement(
            "div",
            {
              class: [
                "text-white",
                "border-b-2",
                "flex-1",
                "py-5",
                "border-[#1a2329]",
                "text-2xl",
                isLogout ? "text-red-500" : "text-white",
              ],
            },
            item.name
          ),
        ]
      );
    },
  },
});

const search = createElement(
  "div",
  {
    class: [
      "flex",
      "items-center",
      "bg-[#222e35]",
      "rounded-md",
      "p-2",
      "mx-4",
      "mt-4",
    ],
  },
  [
    createElement("i", {
      class: ["bi", "bi-search", "text-white", "text-lg"],
    }),
    createElement("input", {
      type: "text",
      placeholder: "Search settings...",
      class: ["ml-2", "bg-transparent", "text-white", "outline-none", "w-full"],
    }),
  ]
);

const seeProfile = createElement(
  "div",
  {
    class: [
      "flex",
      "justify-between",
      "items-center",
      "mt-4",
      "hover:bg-[#1a2329]",
      "p-4",
    ],
  },
  [
    createElement(
      "div",
      { class: ["flex", "justify-center", "items-center", "mx-4"] },
      [
        createElement("img", {
          src: getUser().avatar,
          alt: "Profile Picture",
          class: ["rounded-full", "w-20", "h-20", "mr-2"],
        }),
        createElement("div", { class: ["flex", "flex-col", "text-white"] }, [
          createElement("h2", { class: ["text-lg", "font-bold"] }, "Bal"),
          createElement("p", {}, getUser().name),
        ]),
      ]
    ),
  ]
);

export const setting = createElement(
  "div",
  {
    class: ["w-full", "h-full", "flex", "flex-col", "gap-2"],
  },
  [
    createElement(
      "h1",
      {
        class: ["text-white", "text-3xl", "font-bold", "mx-4", "my-5"],
      },
      "Settings"
    ),
    search,
    seeProfile,
    options,
  ]
);
