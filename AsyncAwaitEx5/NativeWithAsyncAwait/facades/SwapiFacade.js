const URL = "https://swapi.co/api/people/";

let maxValue = 0;

class SwapiFacade {

    constructor() {
        this.init();
    }

    init = async () => {
        const response = await fetch(URL)
        const data = await response.json();
        maxValue = await parseInt(data.count) + 1; // add one because person 17 doesnt exist and screws up the count
    }

    getRandomPerson = async () => {
        let personId = 0;
        do {
            personId = Math.floor(Math.random() * maxValue) + 1;
        } while (personId === 17 || personId > maxValue);
        return await this.getPerson(personId);
    }

    getPerson = async (id) => {
        const response = await fetch(URL.concat(id));
        const data = await response.json();
        return data;
    }

}

export default new SwapiFacade;