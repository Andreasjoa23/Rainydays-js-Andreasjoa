const rightContainer = document.querySelector(".right-container");

function displayCartItems() {
    const jacketItems = JSON.parse(localStorage.getItem("cartJacket")) || [];

    rightContainer.innerHTML = "";

    if (jacketItems.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your cart is empty.";
        rightContainer.appendChild(emptyMessage);
        return;
    }

    let totalPriceAllProducts = 0;

    jacketItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList = "cart-item";

        const image = document.createElement("img");
        image.src = item.image.url;
        image.alt = item.image.alt;

        const productName = document.createElement("p");
        productName.textContent = item.title;

        const productPrice = document.createElement("p");
        productPrice.textContent = "Price: " + item.price + "kr";

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", () => {
            item.quantity++;
            updateCart(jacketItems);
        });

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener("click", () => {
            item.quantity = Math.max(1, item.quantity - 1);
            updateCart(jacketItems);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove item";
        removeButton.addEventListener("click", () => {
            const updatedItems = jacketItems.filter(cartItem => cartItem.title !== item.title);
            localStorage.setItem("cartJacket", JSON.stringify(updatedItems));
            displayCartItems();
        });

        const totalPrice = item.quantity * item.price;
        totalPriceAllProducts += totalPrice;

        cartItem.append(image, productName, productPrice, quantity, increaseButton, decreaseButton, removeButton);
        rightContainer.appendChild(cartItem);
    });

    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = "Total Price: " + totalPriceAllProducts.toFixed(2) + "kr";
    rightContainer.appendChild(totalPriceElement);

    const payButton = document.createElement("button");
    payButton.textContent = "Pay Now";
    payButton.addEventListener("click", () => {
        window.location.href = "/html/orderComplete.html";
    });

    rightContainer.appendChild(payButton);
}

function updateCart(cartItems) {
    localStorage.setItem("cartJacket", JSON.stringify(cartItems));
    displayCartItems();
}

displayCartItems();