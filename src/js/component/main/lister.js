export function renderContactsList(list, selectedId = null) {
  discussionContactsContainer.innerHTML = "";

  const elements = list.map((item) => {
    const isSelected = selectedId === item.id;

    const wrapperClass = [
      "p-2",
      "rounded",
      "shadow",
      "mb-2",
      "flex",
      "gap-1",
      "border",
      "border-gray-200",
      "justify-between",
      "cursor-pointer",
      isSelected ? "bg-blue-100 border-blue-400" : "bg-white",
    ];
    const names = item.name.split(" ");
    let avatar = names[0].charAt(0).toUpperCase();
    console.log(names);

    console.log(names.length);

    if (names.length >= 2) {
      avatar += "-" + names[1].charAt(0).toUpperCase();
    }

    return createElement(
      "div",
      {
        onClick: () => {
        },
        class: wrapperClass,
      },
      [
        createElement(
          "div",
          {
            class: ["p-2", "flex", "gap-1", "items-center"],
          },
          [
            createElement(
              "span",
              {
                class: [
                  "w-10",
                  "h-10",
                  "rounded-full",
                  "bg-green-500",
                  "p-2",
                  "flex",
                  "justify-center",
                  "items-center",
                  "text-white",
                ],
              },
              avatar
            ),
            createElement(
              "div",
              {
                class: ["flex", "flex-col", "gap-1"],
              },
              [
                createElement(
                  "span",
                  {
                    class: ["text-lg", "font-semibold", "text-black"],
                  },
                  item.name
                ),
                createElement(
                  "span",
                  {
                    class: ["text-sm", "text-gray-600"],
                  },
                  item.lastMessage
                ),
              ]
            ),
          ]
        ),
        createElement(
          "div",
          {
            class: [
              "p-2",
              "flex",
              "flex-col",
              "gap-0",
              "justify-around",
              "items-center",
              "relative",
            ],
          },
          [
            createElement(
              "span",
              {
                class: ["text-lg", "font-semibold", "text-black", "opacity-50"],
              },
              item.date
            ),
            createElement("span", {
              class: ["w-2", "h-2", "rounded-full", "bg-green-500"],
            }),
          ]
        ),
      ]
    );
  });

  elements.forEach((el) => discussionContactsContainer.appendChild(el));
}
