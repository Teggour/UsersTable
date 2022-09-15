import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const axiosConfig: AxiosRequestConfig = {
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 5000,
	headers: { "Content-type": "application/json" },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((instance: AxiosRequestConfig) => {
	const apiToken: string | undefined = process.env.REACT_APP_API_TOKEN;

	if (apiToken && instance.headers) {
		instance.headers["Authorization"] = `Bearer ${apiToken}`;
	}

	return instance;
});

export default axiosInstance;
