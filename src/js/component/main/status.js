import { createElement } from "../components";
import { BASE_IMG } from "../../../../config/config";

export const styleIcon = ["cursor-pointer", "text-white", "text-2xl", "px-1"];

const statusLis = [
  {
    content: [
      {
        type: "text",
        value: "Status 1",
      },
      {
        type: "icon",
        value: "Status 2",
      },
      {
        type: "icon",
        value: "Status 3",
      },
    ],
    username: "User 1",
    time: "10:00 AM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 4",
      },
      {
        type: "icon",
        value: "Status 5",
      },
      {
        type: "icon",
        value: "Status 6",
      },
    ],
    username: "User 2",
    time: "11:00 AM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
  {
    content: [
      {
        type: "text",
        value: "Status 7",
      },
      {
        type: "icon",
        value: "Status 8",
      },
      {
        type: "icon",
        value: "Status 9",
      },
    ],
    username: "User 3",
    time: "12:00 PM",
  },
];

const myStatus = createElement(
  "div",
  {
    class: ["flex", "items-center", "p-4", "cursor-pointer"],
  },
  [
    createElement(
      "div",
      {
        class: ["mr-3", "relative", "w-12", "h-12", "rounded-full"],
      },
      [
        createElement("img", {
          class: ["w-12", "h-12", "rounded-full", "mr-3"],
          src: `${BASE_IMG}/Bal.jpeg`,
          alt: "My Status",
        }),
        createElement("i", {
          class: [
            "bi",
            "bi-plus-circle-fill",
            "absolute",
            "text-green-600",
            "text-2xl",
            "-bottom-1",
            "-right-1",
          ],
        }),
      ]
    ),
    createElement("div", { class: ["flex", "flex-col"] }, [
      createElement("span", { class: ["text-white", "text-lg"] }, "My Status"),
      createElement(
        "span",
        { class: ["text-gray-400", "text-sm"] },
        "Tap to add status"
      ),
    ]),
  ]
);

const statusListItems = createElement("div", {
  class: ["flex", "flex-col", "gap-2", "mt-4",],
  vFor: {
    each: statusLis,
    render: (item) => {
      return createElement(
        "div",
        {
          class: [
            "flex",
            "items-center",
            "p-4",
            "cursor-pointer",
            "hover:bg-[#1a2329]",
          ],
        },
        [
          createElement(
            "div",
            {
              class: ["mr-3", "relative", "w-12", "h-12", "rounded-full"],
            },
            [
              createElement("img", {
                class: ["w-12", "h-12", "rounded-full"],
                src: `${BASE_IMG}/Bal.jpeg`,
                alt: item.username,
              }),
            ]
          ),
          createElement("div", { class: ["flex", "flex-col"] }, [
            createElement(
              "span",
              { class: ["text-white", "text-lg"] },
              "My Status"
            ),
            createElement(
              "span",
              { class: ["text-gray-400", "text-sm"] },
              "Tap to add status"
            ),
          ]),
        ]
      );
    },
  },
});

const statusItem = createElement(
  "div",
  {
    class: ["overflow-y-auto"],
  },
  [myStatus, statusListItems]
);

export const status = createElement(
  "div",
  {
    class: ["w-full", "h-full", "flex", "flex-col", "gap-2"],
  },
  [
    createElement(
      "div",
      {
        class: ["w-full", "flex", "justify-between", "items-center", "p-6"],
      },
      [
        createElement(
          "h1",
          {
            class: ["text-white", "text-3xl", "font-bold"],
          },
          "Status"
        ),
        createElement(
          "div",
          {
            class: ["flex", "justify-center", "items-center", "gap-2"],
          },
          [
            createElement("i", {
              class: ["bi bi-plus", ...styleIcon],
            }),
            createElement("i", {
              class: ["bi bi-three-dots-vertical", ...styleIcon],
            }),
          ]
        ),
      ]
    ),
    statusItem,
  ]
);
