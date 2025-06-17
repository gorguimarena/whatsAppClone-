import "./css/style.css";
import { app } from "./js/app";

function initCurrentUser() {
  const currentUser = {
    id: "5",
    name: "Emma 5",
    phone: "+221772345678",
    avatar: "https://i.ibb.co/0VrHF9vX/affiche.png",
    lastSeen: "2025-06-04T23:50:00Z",
    about: "La vie est si dure que la mort rit !"
  };

  localStorage.setItem("user", JSON.stringify(currentUser));
}


initCurrentUser();

document.addEventListener(
  "DOMContentLoaded",
  () => document.body.appendChild(app)
);
