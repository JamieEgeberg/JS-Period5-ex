const express = require('express');
const app = express();
const PORT = 3000;

const fetch = require('node-fetch');
getAlbumsById = (id, words) => {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`).then(res => res.json()).then((res) => {
            let temp = { albumId: id, albums: [] };
            temp.albums = res.filter(e => e.title.split(' ').length === words)
                .map(e => ({ id: e.id, title: e.title }));
            resolve(temp);
        });
    })
};
var p1 = getAlbumsById(1);
var p2 = getAlbumsById(3);
var p3 = getAlbumsById(5);
var p4 = getAlbumsById(7);
var p5 = getAlbumsById(9);

//Promise.all([p1, p2, p3, p4, p5]).then((resArr) => console.log(JSON.stringify(resArr)));

app.get('/api/albumthreewords', (req, res) => {
    let promises = [];
    for (let index = 1; index <= 9; index += 2) {
        promises.push(getAlbumsById(index, 3));
    }
    Promise.all(promises).then(values => res.json(values));
})
app.get('/api/albums/:words', (req, res) => {
    let promises = [];
    const words = parseInt(req.params['words']);
    for (let index = 1; index <= 9; index += 2) {
        promises.push(getAlbumsById(index, words));
    }
    Promise.all(promises).then(values => res.json(values));
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

