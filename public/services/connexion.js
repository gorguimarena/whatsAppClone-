import { BASE_URL, USERS_RESSOURCE } from '../../config/config.js'
import { formConnexionContainer } from '../../src/js/component/forms/connexion.js';
import { space } from '../../src/js/component/user/space.js';

export async function hasPhone(phone) {
  const encodedPhone = encodeURIComponent(phone);
  try {
    const response = await fetch(`${BASE_URL}/${USERS_RESSOURCE}?phone=${encodedPhone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur réseau ou réponse invalide");
    }

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Erreur lors de la vérification du numéro:", error);
    return null;
  }
}

export function toSpace(){
  formConnexionContainer.style.display = "none";
  space.style.display = "flex";
}

