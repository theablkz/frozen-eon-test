import axios from "axios";

const URL = process.env["VUE_APP_NPM_SEARCH_URL"];
const baseURL = `https://${URL}`;

const npmApi = axios.create({ baseURL });

export { npmApi };
