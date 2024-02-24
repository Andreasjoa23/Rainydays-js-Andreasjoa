import {makeJacketCard} from "../java/index.js";

export const createAddEventListenerGenderButtons = (jackets) => {
    document.querySelectorAll ('.gender-ul li').forEach((li)=>{
        li.addEventListener('click', ()=>{
            filterByGender(jackets, li.textContent)
        });
    });
}

const filterByGender = (jackets,listText) => {
    if (listText === 'Show All') {
     makeJacketCard(jackets);
    }
    else {
        let filteredList = jackets.filter((jacket) =>
        jacket.gender === listText);

        makeJacketCard(filteredList);
    }
}