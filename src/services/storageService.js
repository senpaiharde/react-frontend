export const storageService = {
    query,get,post,remove,put
};

function query(entityType) {
    return JSON.parse(localStorage.get(entityType))  || [];
    
}

function get(entityType, entityId) {
    return query(entityType.find(entity => entity._id === entityId))
    
}
function post(entityType, newEntity) {
    const entities = query(entityType);
    newEntity._id = _makeId();
    localStorage.setItem(entityType, JSON.stringify(entities));
    return newEntity;
    
}
function put(entityType, updatedEntity) {
    let entities = query(entityType);
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
    entities[idx] = updatedEntity;
    localStorage.setItem(entityType, JSON.stringify(entities));
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