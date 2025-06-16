import { sideBarBottom, sideBarTop } from "../component/side-bar/side-bar";
import { createElement } from "../component/components";
import {
  setSelected,
  isSelected,
  styleContainer,
  styleSelected,
  styleIcon,
} from "../component/side-bar/actionsSideBar";
import { main } from "../component/main/listdispaly";
import { channels } from "../component/main/channels";
import { chats } from "../component/main/chats";
import { status } from "../component/main/status";
import { profile } from "../component/main/profile";
import { setting } from "../component/main/setting";
import { styleDescription } from "../component/side-bar/actionsSideBar";

import { clearCurrentInterval, renderDiscussionContacts } from "../component/main/lister";
import { discusionVider } from "./discussion";
import { initProfile } from "./profile";
import { getUser } from "./user";

export const sideBarActionsTop = [
  {
    icon: "bi bi-house-door",
    index: 0,
    label: "Chats",
    action: [renderDiscussionContacts, renderSidebar, showChats],
  },
  {
    icon: "bi bi-chat-left-text",
    index: 1,
    label: "Status",
    action: [showStatus],
  },
  {
    icon: "bi bi-person",
    index: 2,
    label: "Channels",
    action: [showChannels],
  },
  {
    icon: "fa-solid fa-users",
    index: 3,
    label: "Communautés",
    action: [],
  },
];

export const sideBarActionsBottom = [
  { icon: "bi bi-gear", index: 4, action: [showSettings], label: "Settings" },
];

export const sideBarAvatar = {
  imageSrc: getUser().avatar,
  index: 5,
  action: [showProfile, initProfile],
  label: "Profile",
};


export function renderSidebar() {
  sideBarTop.innerHTML = "";

  sideBarActionsTop.forEach((item) => {
    const iconWrapper = createElement(
      "div",
      {
        class: [
          isSelected === item.index ? styleSelected : "",
          ...styleContainer,
        ],
        onClick: () => handleSidebarClick(item.index, item.action),
      },
      [
        createElement("i", {
          class: [item.icon, ...styleIcon],
        }),
        createElement(
          "div",
          {
            class: [...styleDescription],
          },
          item.label
        ),
      ]
    );
    sideBarTop.appendChild(iconWrapper);
  });

  sideBarBottom.innerHTML = "";

  sideBarActionsBottom.forEach((item) => {
    const bottomItem = createElement(
      "div",
      {
        class: [
          isSelected === item.index ? styleSelected : "",
          ...styleContainer,
        ],
        onClick: () => handleSidebarClick(item.index, item.action),
      },
      [
        createElement("i", {
          class: [item.icon, ...styleIcon],
        }),
        createElement(
          "div",
          {
            class: [...styleDescription],
          },
          item.label
        ),
      ]
    );
    sideBarBottom.appendChild(bottomItem);
  });

  const avatarElement = createElement(
    "div",
    {
      class: [
        isSelected === sideBarAvatar.index ? styleSelected : "",
        ...styleContainer,
      ],
      onClick: () =>
        handleSidebarClick(sideBarAvatar.index, sideBarAvatar.action),
    },
    [
      createElement("img", {
        src: sideBarAvatar.imageSrc,
        alt: "User Avatar",
        class: ["rounded-full"],
      }),
      createElement(
        "div",
        {
          class: [...styleDescription],
        },
        sideBarAvatar.label
      ),
    ]
  );

  sideBarBottom.appendChild(avatarElement);
}

function cleanMain() {
  main.innerHTML = "";
}

export function showChats() {
  cleanMain();
  main.appendChild(chats);
}
export function showStatus() {
  cleanMain();
  main.appendChild(status);
}
export function showChannels() {
  cleanMain();
  main.appendChild(channels);
}
export function showProfile() {
  cleanMain();
  main.appendChild(profile);
}
export function showSettings() {
  cleanMain();
  main.appendChild(setting);
}

function handleSidebarClick(index, actions = []) {
  setSelected(index);
  renderSidebar();
  discusionVider();
  clearCurrentInterval();

  if (!Array.isArray(actions)) actions = [actions];
  actions.forEach((fn) => {
    if (typeof fn === "function") fn();
  });
}

