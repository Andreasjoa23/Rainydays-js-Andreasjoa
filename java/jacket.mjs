import { showLoading, hideLoading } from '../components/loading.mjs';

const getJacketDetails = async (id) => {
    const jacketList = JSON.parse(localStorage.getItem('jacketList')) || [];
    return jacketList.find(jacket => jacket.id === id);
};

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
    alert('Jacket has been added to cart!');
};

const jacketItem = (jacket) => {
    let main = document.querySelector('main');
    let specificJacket = document.createElement('div');
    specificJacket.classList = "specific-jacket";

    let productContainer = document.createElement('div');
    productContainer.classList = "productContainer";

    let jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;
    jacketImage.alt = jacket.image.alt;

    let productDetails = document.createElement('div');
    productDetails.classList = "productDetails";

    let h2 = document.createElement('h2');
    h2.textContent = jacket.title;

    let p = document.createElement('p');
    p.classList = "jacketText";
    p.textContent = jacket.description;

    let priceDiv = document.createElement('div');
    priceDiv.classList = "price";
    let priceH2 = document.createElement('h2');
    priceH2.textContent = "Price " + jacket.price + 'kr';
    priceDiv.appendChild(priceH2);

    let sizes = document.createElement('div');
    sizes.classList = "sizes";
    jacket.sizes.forEach(size => {
        let sizeButton = document.createElement('button');
        sizeButton.classList = "size";
        sizeButton.textContent = size;
        sizeButton.addEventListener('click', () => {
            alert('Maybe you should go past the cake-store once in a while?')
        });
        sizes.appendChild(sizeButton);
    });

    let addButton = document.createElement('button');
    addButton.type = "button";
    addButton.textContent = "Add to cart";
    addButton.addEventListener('click', () => {
        addToCart(jacket);
    });

    main.appendChild(specificJacket);
    specificJacket.appendChild(productContainer);
    productContainer.append(jacketImage, productDetails);
    productDetails.append(h2, p, priceDiv, sizes, addButton);
};

const initializeProductPage = async () => {
    showLoading();
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const jacketId = urlParams.get('id');

        if (jacketId) {
            const jacket = await getJacketDetails(jacketId);
            if (jacket) {
                jacketItem(jacket);
            } else {
                console.error("Jacket not found.");
            }
        } else {
            console.error("No jacket ID provided.");
        }
    } catch (error) {
        console.error("An error occurred while loading the product page:", error);
    } finally {
        hideLoading();
    }
};
initializeProductPage();