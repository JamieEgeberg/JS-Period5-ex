const fetch = require('node-fetch');

getPlanetforFirstSpeciesInFirstMovieForPersonAsync = async (id) => {
    await fetch(`https://swapi.co/api/people/${id}/`).then(res => res.json()).then(async (res) => {
        console.log(`Name: ${res.name}`);
        await fetch(
            findFirst(res.films))
            .then(res => res.json())
            .then((async res => {
                console.log(`First Film: ${res.title}`);
                await fetch(
                    findFirst(res.species))
                    .then(res => res.json())
                    .then((async res => {
                        console.log(`First Species: ${res.name}`);
                        await fetch(res.homeworld)
                            .then(res => res.json())
                            .then((res => {
                                console.log(`Homeworld for species: ${res.name}`);
                            }))
                    }))
            }))
    })
}

//because who would want hardcoded values? however only works for ids smaller than 10
findFirst = (arr) => {
    let res = undefined;
    let resId = undefined;

    arr.forEach(element => {
        let eArr = element.split('/');
        let eId = parseInt(eArr[eArr.length - 2]);

        if (eArr <= 2) return;
        if (res === undefined || resId === undefined) {
            res = element;
            resId = eId;
            return;
        }
        if (resId > eId) {
            res = element;
            resId = eId;
        }
    });
    return res;
}

getPlanetforFirstSpeciesInFirstMovieForPersonAsync(1);
getPlanetforFirstSpeciesInFirstMovieForPersonAsync(32);
getPlanetforFirstSpeciesInFirstMovieForPersonAsync(85);