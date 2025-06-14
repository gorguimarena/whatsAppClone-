const config = {
  dev: {
    baseURL: "http://localhost:3000"
  },
  prod: {
    baseURL: "https://json-server-api-yf1i.onrender.com"
  }
};

export const BASE_IMG = "data/images";

const env = window.location.hostname === "localhost" ? "dev" : "prod";
const BASE_URL = config[env].baseURL;

export const KEY_IMGBB = '7989da61375bc53937e52136f345bea1';

export { BASE_URL };
export const USERS_RESSOURCE = 'users';
export const CONVERSATION_RESSOURCE = 'conversations';
export const STATUSES_RESSOURCE = 'statuses';
