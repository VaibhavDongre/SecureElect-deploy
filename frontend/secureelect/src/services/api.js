import axios from "axios";

const API = axios.create({
    baseURL: "https://secureelect-deploy.onrender.com",
});

//add JWT token if exists
//Interceptor is a function that runs before every request
//It checks localStorage for saved JWT
//If token exists it attaches
API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;