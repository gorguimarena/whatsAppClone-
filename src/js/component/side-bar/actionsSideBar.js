import { createElement } from "../components";
import {
  sideBarActionsBottom,
  sideBarActionsTop,
} from "../../services/sideBar";
import {
  renderSidebar,
  showChannels,
  showChats,
  showProfile,
  showSettings,
  showStatus,
} from "../../services/sideBar";
import { renderDiscussionContacts } from "../main/lister";
import { discusionVider } from "../../services/discussion";
import { initProfile } from "../../services/profile";
import { getUser } from "../../services/user";
import { renderStatusesFromServer } from "../main/status";
import { userId } from "../main/space";
import { inputSearch, setupContactSearch } from "../main/chats";


export const styleDescription = [
  "absolute",
  "left-full",
  "ml-2",
  "top-1/2",
  "-translate-y-1/2",
  "bg-white",
  "text-black",
  "text-sm",
  "py-1",
  "px-2",
  "rounded",
  "whitespace-nowrap",
  "opacity-0",
  "scale-95",
  "group-hover:opacity-100",
  "group-hover:scale-100",
  "transition-all",
  "duration-200",
  "z-10",
  "shadow-lg",
  "pointer-events-none",
];

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
  "relative",
  "group",
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
      renderDiscussionContacts();
      setupContactSearch(inputSearch, 'normal');
      discusionVider();
      renderSidebar();
      showChats();      
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[0].icon, ...styleIcon],
    }),
    createElement(
      "div",
      {
        class: [...styleDescription],
      },
      "Chats"
    ),
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
      renderStatusesFromServer();
      renderSidebar();
      discusionVider();
      showStatus();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[1].icon, ...styleIcon],
    }),
    createElement(
      "div",
      {
        class: [...styleDescription],
      },
      "Status"
    ),
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
      discusionVider();
      showChannels();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[2].icon, ...styleIcon],
    }),
    createElement(
      "div",
      {
        class: [...styleDescription],
      },
      "Channels"
    ),
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
      discusionVider();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsTop[3].icon, ...styleIcon],
    }),
    createElement(
      "div",
      {
        class: [...styleDescription],
      },
      "Communities"
    ),
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
      discusionVider();
      showSettings();
    },
  },
  [
    createElement("i", {
      class: [sideBarActionsBottom[0].icon, ...styleIcon],
    }),
    createElement(
      "div",
      {
        class: [...styleDescription],
      },
      "Settings"
    ),
  ]
);

export const avatar = createElement(
  "div",
  {
    class: [isSelected == 5 ? styleSelected : "", ...styleContainer],
    onClick: () => {
      isSelected = 5;
      renderSidebar();
      discusionVider();
      showProfile();
      initProfile();
    },
  },
  [
    createElement("img", {
    src: getUser()?.avatar || '',
    alt: "User Avatar",
    class: ["rounded-full"],
  }),
    createElement(
      "div",
      {
        class: [...styleDescription],
      },
      "Profile"
    ),

  ]
);
