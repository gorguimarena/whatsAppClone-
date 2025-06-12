import { createElement } from "../components";
import { countries } from "../../constantes/constants";
import { isValidLocalPhoneNumber, isOnline } from "../../../../public/validators/connexion";
import { errorOutput } from "../../constantes/errors";
import { loseInternet } from "../../../../public/error/loseInternet";
import { hasPhone, toSpace } from "../../../../public/services/connexion";
import { setUserId } from "../main/space";
import { store } from "../../services/user";




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
      "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 box-border",
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
    "my-2",
    "h-80",
    "bg-transparent",
    "text-gray-900",
    "placeholder:text-gray-400",
    "box-border",
  ]
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
    class: ["grid", "w-full gap-4", "box-border"],
  },
  [
    selectCountry,
    createElement(
      "div",
      {
        class: [
          "flex gap-2 w-full justify-center items-center rounded border box-border p-1",
        ],
      },
      [codeCountry, inputNumber]
    ),
  ]
);

export const formConnexionContainer = createElement(
  "form",
  {
    class: [
      "w-96",
      "flex",
      "flex-col",
      "h-screen",
      "justify-center",
      "gap-4",
      "box-border",
      "position-relative",
      "bg-gradient-to-r from-sky-500 to-indigo-500",
    ],
    vShow: false,
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

      const completNumber = `${selectedCountry}${inputNumber.value}`

      const user = hasPhone(completNumber);


      user.then((data) => {
        if (data) {
          toSpace();
          setUserId(data.id);
          store(data);
          console.log("Utilisateur trouvé :", data);

        } else {
          errorOutput.textContent = "Ce numéro n'est pas enregistré !";
        }
      }).catch((err) => {
        console.error("Erreur lors de la connexion :", err);
        errorOutput.textContent = "Une erreur est survenue, veuillez réessayer.";
      });
      
    },
  },
  [
    createElement(
      "h1",
      { class: "text-2xl font-bold text-gray-900 text-center mb-4 box-border" },
      "Saisissez un numéro de téléphone"
    ),
    createElement(
      "h4",
      { class: "text-gray-600 text-center my-8 box-border" },
      "Selectionnez votre pays et saisissez votre numéro de téléphone"
    ),
    createElement("div", { class: "w-full p-4 box-border" }),
    formConnexion,
    errorOutput,
    createElement("div", { class: "w-full p-4 box-border" }),
    btnConnect,
  ]
);
