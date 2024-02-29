import axios from "axios";
import { API_SERVER_ADDRESS } from "../../Constants/serverAddress";
const AxiosInstance = axios.create({
    baseURL: API_SERVER_ADDRESS,
});

// AxiosInstance.interceptors.request(())

export default AxiosInstance;