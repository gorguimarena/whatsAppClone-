import { getUser } from "./user";
import { avatarImg, showAboutValue, showUsername, showUserValue, showVAbout } from "../component/main/profile";
import { BASE_URL, KEY_IMGBB, USERS_RESSOURCE } from "../../../config/config";


export function initProfile(){
    const user = getUser();
    const username = user.name;
    const about = user.about;
    showAboutValue.value = about || "about you";

    showVAbout.innerHTML = "";
    showVAbout.textContent = about || "about you";

    showUserValue.value = username || 'your username';
    showUsername.innerHTML = "";
    showUsername.textContent = username || 'your username';

    avatarImg.src = user.avatar;
}

export async function updateUserAbout(newAbout) {
  const user = getUser();
  if (!user) return;

  try {
    const response = await fetch(`${BASE_URL}/${USERS_RESSOURCE}/${user.id}`, {
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
    const response = await fetch(`${BASE_URL}/${USERS_RESSOURCE}/${user.id}`, {
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
    const response = await fetch(`${BASE_URL}/${USERS_RESSOURCE}/${user.id}`, {
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

export function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  fetch(`https://api.imgbb.com/1/upload?key=${KEY_IMGBB}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      const imageUrl = data.data.url;

      console.log(imageUrl);
      
      avatarImg.src = imageUrl;

      updateUserAvatar(imageUrl);
    })
    .catch((err) => console.error("Erreur upload ImgBB:", err));
}