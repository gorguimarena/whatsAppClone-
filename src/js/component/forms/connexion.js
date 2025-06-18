import { createElement } from "../components";
import { countries } from "../../constantes/constants";
import {
  isValidLocalPhoneNumber,
  isOnline,
} from "../../../../public/validators/connexion";
import { errorOutput } from "../../constantes/errors";
import { loseInternet } from "../../../../public/error/loseInternet";
import { hasPhone, toSpace } from "../../../../public/services/connexion";
import { setUserId, userId } from "../main/space";
import { store } from "../../services/user";
import { getIsConnected, setIsConnected } from "../../services/connect";
import { getConversationsToServer, getUsersWithPrivateConversations } from "../../services/getters";

let selectedCountry = countries[0].code;

const codeCountry = createElement(
  "span",
  {
    class:
      "text-sm h-full box-border bg-blue-500 p-2 text-bold border rounded-l-md",
  },
  `${selectedCountry}`
);

const btnConnect = createElement(
  "button",
  {
    class:
      "bg-[#0c1387] text-white p-3 rounded hover:bg-blue-600 box-border w-96",
    type: "submit",
  },
  "Se connecter"
);

const inputNumber = createElement("input", {
  type: "tel",
  placeholder: "Numéro de téléphone",
  class: [
    "border-none",
    "rounded-r-md",
    "w-full",
    "focus:outline-none",
    "focus:ring-2",
    "p-2",
    "text-gray-900",
    "placeholder:text-gray-400",
    "box-border",
  ],
});

const selectCountry = createElement(
  "select",
  {
    class:
      "border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 mb-4 box-border",
    onChange: (e) => {
      selectedCountry = e.target.value;
      codeCountry.textContent = selectedCountry;
    },
    vFor: {
      each: countries,
      render: (country) =>
        createElement(
          "option",
          { value: country.code },
          `${country.flag} ${country.name} (${country.code})`
        ),
    },
  },
  [
    createElement(
      "option",
      { value: "", disabled: true, selected: true },
      `${countries[0].flag} ${countries[0].name} (${countries[0].code})`
    ),
  ]
);

const formConnexion = createElement(
  "div",
  {
    class: ["grid", "gap-3", "box-border", "w-96"],
  },
  [
    selectCountry,
    createElement(
      "div",
      {
        class: ["flex w-full justify-center items-center rounded box-border"],
      },
      [codeCountry, inputNumber]
    ),
  ]
);
const connectProgress = createElement('div', {
  class: [
    "flex",
    "w-full",
    "h-full",
    "fixed",
    "top-0",
    "left-0",
    "bg-black/60",
    "z-50",
    "items-center",
    "justify-center"
  ],
  vShow: false
}, 
  createElement("div", {
    class: [
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "bg-white/10",
      "backdrop-blur-md",
      "p-6",
      "rounded-xl",
      "shadow-lg",
      "gap-4",
      "text-white"
    ]
  }, [
    createElement("svg", {
      class: "animate-spin h-10 w-10 text-white",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24"
    }, [
      createElement("circle", {
        class: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        "stroke-width": "4"
      }),
      createElement("path", {
        class: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      })
    ]),
    
    createElement("span", {
      class: "text-lg font-semibold tracking-wide"
    }, "Connexion sécurisée en cours…")
  ])
);


export const formConnexionContainer = createElement(
  "form",
  {
    class: [
      "w-full",
      "max-w-md",
      "mx-auto",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "gap-6",
      "p-8",
      "bg-gradient-to-br",
      "bg-[#0c1317]",
      "to-[#1a237e]",
      "rounded-xl",
      "shadow-2xl",
      "border",
      "border-white/10",
      "backdrop-blur-sm",
      "relative",
      "overflow-hidden",
      "relative",
    ],
    vShow: true,
    onSubmit: (e) => {
      e.preventDefault();

      if (!isOnline()) {
        formConnexionContainer.style.display = "none";
        loseInternet.style.display = "block";
        return;
      }

      if (!isValidLocalPhoneNumber(inputNumber.value, errorOutput)) {
        return;
      }

      const completNumber = `${selectedCountry}${inputNumber.value}`;

      const user = hasPhone(completNumber);

      user
        .then((data) => {
          connectProgress.style.display = "none"; 

          if (data) {
            toSpace();
            setUserId(data.id);
            store(data);
            setIsConnected(true);
          } else {
            errorOutput.textContent = "Ce numéro n'est pas enregistré !";
          }
        })
        .catch((err) => {
          connectProgress.style.display = "none"; 
          console.error("Erreur lors de la connexion :", err);
          errorOutput.textContent =
            "Une erreur est survenue, veuillez réessayer.";
        });
    },
  },
  [
    createElement(
      "h1",
      { class: "text-2xl font-bold text-white text-center box-border" },
      "Saisissez un numéro de téléphone"
    ),
    createElement(
      "h4",
      { class: "text-white font-bold text-center my-8 box-border" },
      "Selectionnez votre pays et saisissez votre numéro de téléphone"
    ),
    formConnexion,
    errorOutput,
    btnConnect,
    connectProgress,
  ]
);
