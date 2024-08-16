import axios from "axios";
import { API_URI } from "./api";

const axiosInstance = axios.create({
    baseURL: API_URI,
});

export default axiosInstance;
