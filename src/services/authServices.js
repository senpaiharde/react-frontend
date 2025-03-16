import axios from "axios";
import { json } from "express";

const BASE_URL = "http://localhost:5000/api/users";

async function signup(userData) {
    try {
        const res = await axios.post(`${BASE_URL}/signup`, userData);
        return res.data;
    } catch (err) {
        console.error("Signup Error:", err);
        throw err;
    }
}

async function login(userData) {
    try {
        const res = await axios.post(`${BASE_URL}/login`, userData);
        const {token, isAdmin, fullname} = res.data;

        localStorage.getItem('user', json.stringify({token, isAdmin, fullname}));
        return res.data;
    } catch (err) {
        console.error("login Error:", err);
        throw err;
    }
}

function logout() {
    localStorage.removeItem('user');
}

function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? json.parse(user) : null;
}


export const authService = {
    signup,
    login,
    logout,
    getUserFromLocalStorage,
}