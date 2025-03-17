import axios from "axios";


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
        console.log("Sending login request:", userData); // ✅ Debug log
        const res = await axios.post(`${BASE_URL}/login`, userData);
        console.log("Login response:", res.data); // ✅ Debug log
        const {token, isAdmin, fullname} = res.data;

        localStorage.setItem('user', JSON.stringify({token, isAdmin, fullname}));
        return res.data;
    } catch (err) {
        console.error("Login Error:", err.response?.data || err.message);
        throw err;
    }
}

function logout() {
    localStorage.removeItem('user');
}

function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}


export const authService = {
    signup,
    login,
    logout,
    getUserFromLocalStorage,
}