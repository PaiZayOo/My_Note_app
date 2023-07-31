import axios from "axios";

const usersApi = axios.create({
    baseURL: "http://localhost:4000",
});

export const registerUser = async (userData) => {
    return await usersApi.post("/users", userData);
}