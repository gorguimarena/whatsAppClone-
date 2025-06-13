import { setUserId } from "../component/main/space";

function disconnected() {
    setUserId(null);
    location.reload(); 
}

export { disconnected };
