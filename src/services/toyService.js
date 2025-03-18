import axios from "axios";

const BASE_URL = "http://localhost:5000/api/toys"; // Backend URL

export const toyService = {
    getToys,
    getToyById,
    saveToy,
    deleteToy,
    getLabels
};

// ✅ GET all toys from MongoDB
async function getToys() {
    try {
        const res = await axios.get(BASE_URL);
        return res.data;
    } catch (err) {
        console.error("Error fetching toys:", err);
        throw err;
    }
}

// ✅ GET a single toy by ID
async function getToyById(toyId) {
    try {
        const res = await axios.get(`${BASE_URL}/${toyId}`);
        return res.data;
    } catch (err) {
        console.error("Error fetching toy:", err);
        throw err;
    }
}

// ✅ CREATE or UPDATE a toy
async function saveToy(toy, token) {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        if (toy._id) {
            // Update existing toy
            const res = await axios.put(`${BASE_URL}/${toy._id}`, toy, {headers});
            return res.data;
        } else {
            // Create new toy
            const res = await axios.post(BASE_URL, toy ,{headers});
            return res.data;
        }
    } catch (err) {
        console.error("Error saving toy:", err);
        throw err;
    }
}

// ✅ DELETE a toy
async function deleteToy(toyId,token) {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await axios.delete(`${BASE_URL}/${toyId}`,{headers});
    } catch (err) {
        console.error("Error deleting toy:", err);
        throw err;
    }
}

// ✅ Get toy labels (for filtering)
function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'];
}
