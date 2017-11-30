const fetch = require('node-fetch');

getPlanetforFirstSpeciesInFirstMovieForPerson = (id) => {
    fetch(`https://swapi.co/api/people/${id}/`).then(res => res.json()).then((res) => {
        console.log(`Name: ${res.name}`);
        fetch(
            findFirst(res.films))
            .then(res => res.json())
            .then((res => {
                console.log(`First Film: ${res.title}`);
                fetch(
                    findFirst(res.species))
                    .then(res => res.json())
                    .then((res => {
                        console.log(`First Species: ${res.name}`);
                        fetch(res.homeworld)
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

getPlanetforFirstSpeciesInFirstMovieForPerson(1);
getPlanetforFirstSpeciesInFirstMovieForPerson(32);
getPlanetforFirstSpeciesInFirstMovieForPerson(85);