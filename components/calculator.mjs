export function getTotalAmount() {
    const currentLocalStorageData = JSON.parse(localStorage.getItem("cart"));
  
    const quantityContainers = document.querySelectorAll(".quantity-container");
  
    Array.from(quantityContainers).forEach(quantityContainer => {
      const quantityText = document.createElement("p");
      quantityText.classList.add("quantity-text");
      quantityContainer.appendChild(quantityText);
  
      let totalAmount = 0;
      if (currentLocalStorageData !== null) {
        for(let i = 0; i < currentLocalStorageData.length; i++) {
          const itemAmountPerItem = currentLocalStorageData[i].amount;
          totalAmount = totalAmount + itemAmountPerItem;
        }
        quantityText.textContent = totalAmount;
      } else {
        quantityText.textContent = "0";
      }
    });
  }
  getTotalAmount();