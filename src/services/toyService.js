const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'];


const toys =  [ 
    {
 _id: 't101',
 name: 'Talking Doll',
 imgUrl: 'https://via.placeholder.com/150',
 price: 123,
 labels: ['Doll', 'Battery Powered', 'Baby'],
 createdAt: Date.now(),
 inStock: true,
},
{
    _id: 't102',
    name: 'Puzzle Game',
    imgUrl: 'https://via.placeholder.com/150',
    price: 45,
    labels: ['Puzzle', 'Box game'],
    createdAt: Date.now(),
    inStock: false,

}];

export const toyService = {
    getToys,
    getLabels
};


function getToys(){
    return toys;
}

function getLabels(){
    return labels;
}

