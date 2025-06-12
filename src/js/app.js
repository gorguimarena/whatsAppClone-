import { createElement } from "./component/components";
import { formConnexionContainer } from "./component/forms/connexion";
import { loseInternet } from "../../public/error/loseInternet";
import { space } from "./component/main/space";


export const app = createElement(
  "div",
  {
    class: [
      "min-h-screen",
      "flex",
      "items-center",
      "justify-center",
      "bg-[#0c1317]",
    ],
  },
  [formConnexionContainer, loseInternet, space]
);


