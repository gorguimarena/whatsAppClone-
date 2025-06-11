import { sideBarBottom, sideBarTop } from "../component/side-bar/side-bar";
import { createElement } from "../component/components";
import { setSelected, isSelected, styleContainer, styleSelected, styleIcon } from "../component/side-bar/actionsSideBar";
import { main } from "../component/main/listdispaly";
import { channels } from "../component/main/channels";
import { chats } from "../component/main/chats";
import { status } from "../component/main/status";
import { profile } from "../component/main/profile";
import { setting } from "../component/main/setting";

export const sideBarActionsTop = [
  { icon: "bi bi-house-door", index: 0, action: showChats },
  { icon: "bi bi-chat-left-text", index: 1, action: showStatus },
  { icon: "bi bi-person", index: 2, action: showChannels },
  { icon: "bi bi-person", index: 3, action: () => {} }, 
];

export const sideBarActionsBottom = [
  { icon: "bi bi-gear", index: 4, action: showSettings },
];

export const sideBarAvatar = {
  imageSrc: "https://avatars.githubusercontent.com/u/12345678?v=4",
  index: 5,
  action: showProfile,
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
    createElement("img", {
      src: sideBarAvatar.imageSrc,
      alt: "User Avatar",
      class: ["rounded-full"],
    })
  );

  sideBarBottom.appendChild(avatarElement);
}


function cleanMain() {
  main.innerHTML = "";
}

export function showChats(){
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

function handleSidebarClick(index, action) {
  setSelected(index);
  renderSidebar();
  action?.(); // Exécute l'action s'il y en a une
}
