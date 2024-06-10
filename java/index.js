import { apiUrl, dataAPI } from '../components/fetch.mjs';
import { createAddEventListenerGenderButtons } from "../components/filter.mjs";

const addToCart = (jacket) => {
    let cartItems = JSON.parse(localStorage.getItem("cartJacket")) || [];
    let existingItem = cartItems.find(item => item.title === jacket.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        jacket.quantity = 1;
        cartItems.push(jacket);
    }
    localStorage.setItem("cartJacket", JSON.stringify(cartItems));
};

const jacketCardContent = (jacket) => {
    let collectionItems = document.getElementById('collectionItems');

    let row = document.createElement('ul');
    row.classList = "row";

    let productContainer = document.createElement('li');
    productContainer.classList = "product";

    productContainer.dataset.gender = jacket.gender;

    let jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;
    jacketImage.alt = jacket.image.alt;
    jacketImage.classList = "product-image";

    const linkToProduct = document.createElement('a');
    linkToProduct.href = './html/jacket.html';
    linkToProduct.classList = 'linkToProduct';
    linkToProduct.addEventListener('click', () => {
        localStorage.setItem("jacket", JSON.stringify(jacket));
    });

    let h3 = document.createElement('h3');
    h3.textContent = jacket.title;

    let p = document.createElement('p');
    p.textContent = jacket.price + 'kr';

    let addButton = document.createElement('button');
    addButton.textContent = "Add to cart";
    addButton.addEventListener('click', () => {
        addToCart(jacket);
    });

    collectionItems.appendChild(row);
    row.appendChild(productContainer);
    productContainer.append(h3, p, linkToProduct, addButton);
    linkToProduct.appendChild(jacketImage);
};

export const makeJacketCard = (jacketList) => {
    let collectionItems = document.createElement('div');
    collectionItems.id = "collectionItems";
    collectionItems.classList = "collectionItems";

    let main = document.querySelector('main');

    main.appendChild(collectionItems);
    let row = document.getElementById('collectionItems');
    row.innerHTML = '';
    
    jacketList.forEach((jacket) => 
        jacketCardContent(jacket)
    );
};

const initializeApp = async () => {
    let jacketList = JSON.parse(localStorage.getItem('jacketList'));
    if (!jacketList) {
        jacketList = await dataAPI(apiUrl);
    }

    if (jacketList) {
        makeJacketCard(jacketList);
        createAddEventListenerGenderButtons(jacketList);
    } else {
        console.error("Failed to load jackets.");
    }
};
initializeApp();