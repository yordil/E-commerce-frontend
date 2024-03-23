import axios from "axios";

const axiosInstance = axios.create({
	// baseURL: "http://127.0.0.1:5001/clone-6a383/us-central1/api",
	baseURL: "https://e-commerce-api-1.onrender.com/" , 
});


export { axiosInstance};