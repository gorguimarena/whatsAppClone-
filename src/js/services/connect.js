import { setUserId } from "../component/main/space";
import { clearUser } from "./user";

function setIsConnected(connected) {
  localStorage.setItem('isConnected', JSON.stringify(connected));
}

function getIsConnected() {
  return JSON.parse(localStorage.getItem('isConnected')) || false;
}

function disconnected() {
  setUserId(null);
  setIsConnected(false);
  clearUser();
  location.reload();
}


export { disconnected, setIsConnected, getIsConnected };
