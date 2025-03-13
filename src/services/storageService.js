export const storageService = {
    query,
    get,
    post,
    remove,
    put
};

function query(entityType) {
    const data = localStorage.getItem(entityType);
    return data ? JSON.parse(data) : [];

    
}

function get(entityType, entityId) {
    const entities = query(entityType);
    return entities.find(entity => entity._id === entityId) || null;
    
}
function post(entityType, newEntity) {
    const entities = query(entityType);
    newEntity._id = _makeId();
    entities.push(newEntity);
    localStorage.setItem(entityType, JSON.stringify(entities));
    return newEntity;
    
}
function put(entityType, updatedEntity) {
    let entities = query(entityType);
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
    if(idx !== -1 ){
    entities[idx] = updatedEntity;
    localStorage.setItem(entityType, JSON.stringify(entities));
    }
    return updatedEntity;
    
}
function remove(entityType, entityId) {
    let entities = query(entityType);
    entities = entities.filter(entity => entity._id !== entityId);
    localStorage.setItem(entityType, JSON.stringify(entities));
    return entities;
    
}

function _makeId(length = 5) {
    return Math.random().toString(36).substr(2,length);
    
}