import { storageService } from "./storageService";

const ENTITY_TYPE = 'toys';

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'];

const backupToys = [
    {
        _id: 't101',
        name: 'Talking Doll',
        imgUrl: 'https://via.placeholder.com/100',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
    },
    {
        _id: 't102',
        name: 'Puzzle Game',
        imgUrl: 'https://via.placeholder.com/100',
        price: 45,
        labels: ['Puzzle', 'Box game'],
        createdAt: Date.now(),
        inStock: false,
    },
];

async function _initToys() {
    const toys = await storageService.query(ENTITY_TYPE);
    if (!toys.length) {
        await Promise.all(backupToys.map(toy => storageService.post(ENTITY_TYPE, toy)));
    }
}

_initToys();

export const toyService = {
    getToys,
    getToyById,
    saveToy,
    deleteToy,
    getLabels
};

async function getToys() {
    return await storageService.query(ENTITY_TYPE);
}

async function getToyById(toyId) {
    return await storageService.get(ENTITY_TYPE, toyId);
}

async function saveToy(toy) {
    return toy._id ? await storageService.put(ENTITY_TYPE, toy) : await storageService.post(ENTITY_TYPE, toy);
}

async function deleteToy(toyId) {
    return await storageService.remove(ENTITY_TYPE, toyId);
}

function getLabels() {
    return labels;
}
