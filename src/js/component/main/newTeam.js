import { chatsToNewChat } from "../../services/setter";
import { createElement } from "../components";
import { styleIconOptions } from "./setting";

const newTeam = createElement(
  "div",
  {
    class: ["h-full"],
  },
  [
    createElement(
      "div",
      {
        class: ["mx-4", "my-5", "flex", "gap-3", 'items-center'],
      },
      [
        createElement(
          "i",
          {
            class: ["text-white", "text-4xl", "font-bold", "bi bi-arrow-left", "my-5", 'cursor-pointer'],
            onclick: ()=> {
                chatsToNewChat();
            }
          },
          
        ),
        createElement(
          "span",
          {
            class: ["text-white", "text-2xl", "mx-4", "my-5"],
          },
          "Add group members"
        ),
      ]
    ),
    createElement(
      "form",
      {
        class: [
            'mx-6',
            'bg-red-500'
        ]
      },
      createElement("input", {
        type: "text",
        class:[
            'w-full',
            "border-[#1a2329]",
            "border-b-2",
            'bg-[#0c1317]',
            'outline-none',
            'p-1',
            'text-white',
            'text-2lg'
        ],
        placeholder: 'Search name or number'
      })
    ),
    createElement(
      "div",
      {
        class: [...styleIconOptions, "border-[#1a2329]", "border-b-2", "py-6"],
      },
      createElement(
        "span",
        {
          class: ["text-2xl", "text-green-500"],
        },
        "A"
      )
    ),
    createElement('div', {
        class: [
            'flex',
            'flex-col',
        ]
    }, 'Ok')
  ]
);

export { newTeam };
