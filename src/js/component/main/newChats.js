import { createElement } from "../components";
import { styleIconOptions } from "./setting";
import { newChatToChats, toNTeam } from "../../services/setter";

const optionsAction = [
  {
    name: "New group",
    icon: "bi bi-person",
    action: () => {
      toNTeam();
    },
  },
  {
    name: "New cummunity",
    icon: "bi bi-shield-lock",
    action: () => {},
  },
];

const addTeamCommunity = createElement("div", {
  class: ["flex", "flex-col"],
  vFor: {
    each: optionsAction,
    render: (item) => {
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
          createElement(
            "div",
            {
              class: [
                "bg-green-500",
                "ml-4",
                "rounded-full",
                "w-16 h-16",
                "flex",
                "justify-center",
                "items-center",
              ],
            },
            createElement("i", {
              class: [item.icon, ...styleIconOptions],
            })
          ),
          createElement(
            "div",
            {
              class: [
                "text-white",
                "border-b-2",
                "flex-1",
                "py-6",
                "border-[#1a2329]",
                "text-2xl",
                "text-white",
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

export const newChats = createElement(
  "div",
  {
    class: ["w-full", "h-full", "flex", "flex-col", "gap-2"],
  },
  [
    createElement(
      "div",
      {
        class: ["mx-4", "my-5", "flex", "gap-3"],
      },
      [
        createElement(
          "i",
          {
            class: ["text-white", "text-4xl", "font-bold", "bi bi-arrow-left", "my-5", 'cursor-pointer'],
            onclick: ()=> {
              newChatToChats();
            }
          },
          
        ),
        createElement(
          "span",
          {
            class: ["text-white", "text-2xl", "mx-4", "my-5"],
          },
          "New chat"
        ),
      ]
    ),
    search,
    addTeamCommunity,
    createElement(
      "div",
      {
        class: [...styleIconOptions, "border-[#1a2329]", "border-b-2", "py-6"],
      },
      createElement('span', {
        class: [
            'text-2xl',
            'text-green-500'
        ]   
      }, "CONTACTS ON WHATSAPP")
    ),
    createElement(
      "div",
      {
        class: ["flex", "flex-col"],
      },
      [
        createElement(
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
            onclick: {},
          },
          [
            createElement(
              "div",
              { class: ["flex", "justify-center", "items-center", "ml-4"] },
              [
                createElement("img", {
                  src: `https://avatars.githubusercontent.com/u/12345678?v=4`,
                  alt: "Profile Picture",
                  class: ["rounded-full", "w-20", "h-20"],
                }),
              ]
            ),
            createElement(
              "div",
              {
                class: [
                  "text-white",
                  "border-b-2",
                  "border-[#1a2329]",
                  "text-2xl",
                  "text-white",
                  "h-full",
                  "flex",
                  "flex-col",
                  "flex-1",
                  "justify-center",
                ],
              },
              [
                createElement(
                  "p",
                  { class: ["text-white", "text-lg"] },
                  "Gorgui marena"
                ),
                createElement(
                  "p",
                  { class: ["text-gray-400", "text-sm"] },
                  "I here to code "
                ),
              ]
            ),
          ]
        ),
      ]
    ),
    createElement(
      "div",
      {
        class: [...styleIconOptions, "border-[#1a2329]", "border-b-2", "py-6"],
      },
      createElement('span', {
        class: [
            'text-2xl',
            'text-green-500'
        ]   
      }, "A")
    ),
  ]
);
