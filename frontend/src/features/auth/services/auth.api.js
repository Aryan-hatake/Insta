import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function login(username, password) {

    try {
        const response = await api.post("/login", {
            username, password
        })
        console.log(response.data)
        return response.data;
    }
    catch (err) {
        alert("login api connection failed")
    }
}

export async function register(email, username, password) {
    try {
        const response = await api.post("/register", {
            email, username, password
        })
        console.log(response.data)
        return response.data;
    }
    catch (err) {
        alert("register api connection failed")
    }
}