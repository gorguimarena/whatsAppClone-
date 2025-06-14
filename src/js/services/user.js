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

export async function updateUserAbout(newAbout) {
  const user = getUser();
  if (!user) return;

  try {
    const response = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ about: newAbout }),
    });

    if (!response.ok) throw new Error("Erreur lors de la mise à jour");

    const updatedUser = await response.json();
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Échec de la mise à jour du statut :", error);
  }
}



export async function updateUserAvatar(newAvatarUrl) {
  const user = getUser();
  if (!user) return;

  try {
    const response = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: newAvatarUrl }),
    });

    if (!response.ok) throw new Error("Erreur lors de la mise à jour");

    const updatedUser = await response.json();
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Échec de la mise à jour de l'avatar :", error);
  }
}


export async function updateUserName(newName) {
  const user = getUser();
  if (!user) return;

  try {
    const response = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });

    if (!response.ok) throw new Error("Erreur lors de la mise à jour");

    const updatedUser = await response.json();
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Échec de la mise à jour du nom :", error);
  }
}



function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  fetch(`https://api.imgbb.com/1/upload?key=${KEY_IMGBB}` , {
    method: "POST",
    body: formData,
  })
  .then(res => res.json())
  .then(data => {
    const imageUrl = data.data.url;
    avatarImg.src = imageUrl;
    updateUserAvatar("1", imageUrl); // PATCH dans json-server
  })
  .catch(err => console.error("Erreur upload ImgBB:", err));
}
