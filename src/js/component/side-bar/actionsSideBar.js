import { createElement } from "../components";
import { sideBarActionsBottom, sideBarActionsTop } from "../../services/sideBar";
import { BASE_IMG } from "../../../../config/config";
import { renderSidebar, showChannels, showChats, showProfile, showSettings, showStatus } from "../../services/sideBar";

export const styleContainer = [
  "w-12",
  "h-12",
  "flex",
  "justify-center",
  "items-center",
  "rounded-full",
  "gap-4",
  "cursor-pointer",
  "mb-2",
  "p-2",
];

export const styleIcon = ["text-gray-500", "text-2xl"];

export const styleSelected = "bg-gray-700";

export let isSelected = 0;

export function setSelected(index) {
  isSelected = index;
}


export const chats = createElement(
  "div",
  {
    class: [
      isSelected == sideBarActionsTop[0].index ? styleSelected : "",
      ...styleContainer,
    ],
    onClick: () => {
      isSelected = sideBarActionsTop[0].index;
      renderSidebar();
      showChats();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[0].icon, ...styleIcon],
    }),
  ]
);

export const status = createElement(
  "div",
  {
    class: [
      isSelected == sideBarActionsTop[1].index ? styleSelected : "",
      ...styleContainer,
    ],
    onClick: () => {
      isSelected = sideBarActionsTop[1].index;
      renderSidebar();
      showStatus();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[1].icon, ...styleIcon],
    }),
  ]
);

export const channels = createElement(
  "div",
  {
    class: [
      isSelected == sideBarActionsTop[2].index ? styleSelected : "",
      ...styleContainer,
    ],
    onClick: () => {
        isSelected = sideBarActionsTop[2].index;
        renderSidebar();
        showChannels();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[2].icon, ...styleIcon],
    }),
  ]
);

export const communities = createElement(
  "div",
  {
    class: [
      isSelected == sideBarActionsTop[3].index ? styleSelected : "",
      ...styleContainer,
    ],
    onClick: () => {
        isSelected = sideBarActionsTop[3].index;
        renderSidebar();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[3].icon, ...styleIcon],
    }),
  ]
);

export const settings = createElement(
  "div",
  {
    class: [
      isSelected == sideBarActionsBottom[0].index ? styleSelected : "",
      ...styleContainer,
    ],
    onClick: () => {
      isSelected = sideBarActionsBottom[0].index;
      renderSidebar();
      showSettings();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsBottom[0].icon, ...styleIcon],
    }),
  ]
);

export const avatar = createElement(
  "div",
  {
    class: [isSelected == 5 ? styleSelected : "", ...styleContainer],
    onClick: () => {
      isSelected = 5;
      renderSidebar();
      showProfile();
    },
  },
  createElement("img", {
    src: `${BASE_IMG}/Bal.jpeg`,
    alt: "User Avatar",
    class: ["rounded-full"],
  })
);


