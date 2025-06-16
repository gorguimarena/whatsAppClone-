import { KEY_IMGBB } from "../../../config/config";

export function store(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function storeUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export function getUsers(){
    return JSON.parse(localStorage.getItem('users'));
}

export function getUser(){
    return JSON.parse(localStorage.getItem('user'));
}


export function clearUser() {
    localStorage.removeItem('user');
}
export function isUserLoggedIn() {
    const user = getUser();
    return user && user.id ? true : false;
}

export async function createNewUserAndConversation(userData, currentUserId) {
  // 1. Ajouter l'utilisateur
  const newUser = {
    ...userData,
    id: Date.now().toString(), // id sous forme de string
    lastSeen: new Date().toISOString()
  };

  const userRes = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  if (!userRes.ok) {
    console.error("Erreur lors de l'ajout de l'utilisateur");
    return;
  }

  // 2. Créer la conversation privée
  const newConversation = {
    participants: [currentUserId, Number(newUser.id)],
    isGroup: false,
    isArchived: false,
    messages: []
  };

  const convRes = await fetch("http://localhost:3000/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newConversation)
  });

  if (!convRes.ok) {
    console.error("Erreur lors de la création de la conversation");
  } else {
    console.log("Nouvel utilisateur + conversation créés");
  }
}


