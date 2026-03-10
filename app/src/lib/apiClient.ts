import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3334";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export const apiClient = axios.create({
	baseURL,
	withCredentials: true,
});
