import { setUserId } from "../component/main/space";

function setIsConnected(connected) {
  localStorage.setItem('isConnected', JSON.stringify(connected));
}

function getIsConnected() {
  return JSON.parse(localStorage.getItem('isConnected')) || false;
}

function disconnected() {
  setUserId(null);
  setIsConnected(false);
  location.reload();
}


export { disconnected, setIsConnected, getIsConnected };
