import { BASE_URL, USERS_RESSOURCE } from "../../config/config";

function getData() {
  return fetch(`${BASE_URL}/${USERS_RESSOURCE}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "There has been a problem with the fetch operation:",
        error
      );
    });
}

export async function getUsers() {
  try {
    const data = await getData();
    return data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function addUser(user) {
  return await fetch(`${BASE_URL}/${USERS_RESSOURCE}`, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  })
    .then((res) => res.ok)
    .catch((e) => e);
}


