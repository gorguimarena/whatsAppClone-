import { createElement } from "../components";

const listDisplay = [
    'All', 'Unread', 'Favorites', 'Groups'
]

const discussionContactsContainer = createElement(
  "div",
  {
    id: "discussion-contacts-container",
    class: ["w-full", "flex", "flex-col", "gap-2"],
  },
  createElement(
    "ul",
    {
      class: [
        "w-full",
        "h-full",
        "overflow-y-auto",
        "flex",
        "flex-col",
        "gap-2",
        "mt-2",
        
      ],
    },
    [
      // This is where the contacts will be rendered
      createElement(
        "li",
        {
          class: [
            "w-full",
            "p-2",
            "bg-[#222e35]",
            "rounded-md",
            "cursor-pointer",
          ],
        },
        [
          createElement(
            "span",
            {
              class: ["text-white", "font-semibold"],
            },
            "Contact 1"
          ),
        ]
      ),
      createElement(
        "li",
        {
          class: [
            "w-full",
            "p-2",
            "bg-[#222e35]",
            "rounded-md",
            "cursor-pointer",
          ],
        },
        [
          createElement(
            "span",
            {
              class: ["text-white", "font-semibold"],
            },
            "Contact 1"
          ),
        ]
      ),
      createElement(
        "li",
        {
          class: [
            "w-full",
            "p-2",
            "bg-[#222e35]",
            "rounded-md",
            "cursor-pointer",
          ],
        },
        [
          createElement(
            "span",
            {
              class: ["text-white", "font-semibold"],
            },
            "Contact 1"
          ),
        ]
      ),
      createElement(
        "li",
        {
          class: [
            "w-full",
            "p-2",
            "bg-[#222e35]",
            "rounded-md",
            "cursor-pointer",
          ],
        },
        [
          createElement(
            "span",
            {
              class: ["text-white", "font-semibold"],
            },
            "Contact 1"
          ),
        ]
      ),
    ]
  )
);

const inputSearch = createElement("input", {
  class: [
    "w-full",
    "bg-[#222e35]",
    "border-none",
    "outline-none",
    "rounded-md",
    "p-2",
    "mt-2",
    "text-white",
  ],
  placeholder: "Rechercher un utilisateur par nom ou numéro",
  type: "text",
});

export const chats = createElement(
  "div",
  {
    class: ["w-full", "h-full", "flex", "flex-col", "gap-2", "p-4"],
  },
  [
    createElement(
      "div",
      {
        class: ["w-full", "py-2"],
      },
      [
        createElement(
          "div",
          {
            class: [
              "w-full",
              "flex",
              "justify-between",
              "items-center",
              "py-4",
            ],
          },
          [
            createElement(
              "h1",
              {
                class: ["text-white", "text-4xl", "font-bold"],
              },
              "Chats"
            ),
            createElement(
              "div",
              {
                class: ["flex", "justify-center", "items-center", "gap-2"],
              },
              [
                createElement("i", {
                  class: [
                    "bi bi-chat-square-text",
                    "text-white",
                    "text-2xl",
                    "cursor-pointer",
                  ],
                }),
                createElement("i", {
                  class: [
                    "bi bi-gear",
                    "text-white",
                    "text-2xl",
                    "cursor-pointer",
                    "ml-2",
                  ],
                }),
              ]
            ),
          ]
        ),
        createElement(
          "form",
          {
            class: ["w-full", "py-2"],
          },
          inputSearch
        ),
      ]
    ),
    createElement('div',{
        class: ["w-96", "flex", "justify-between", "items-center", 'gap-0'],
        vFor: {
            each: listDisplay,
            render: (item) =>
                createElement(
                "button",
                {
                    class: [
                    "py-2",
                    "text-left",
                    "bg-[#222e35]",
                    "rounded-full",
                    "text-white",
                    "hover:bg-[#2c3a45]",
                    'px-5',
                    ],
                    onclick: () => {
                    console.log(`Clicked on ${item}`);
                    },
                },
                item
                ),
        }
    }),
    discussionContactsContainer,
  ]
);