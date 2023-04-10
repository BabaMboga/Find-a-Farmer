document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").reset();
  const galleryContainer = document.querySelector(".card-container");

  // Make a request to the API
  fetch("https://my-json-server.typicode.com/BabaMboga/Find-a-Farmer/db")
    .then((response) => response.json())
    .then((products) => {
      // Loop through the data and create a card for each item
      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = product.productimage;
        card.appendChild(image);

        const title = document.createElement("h3");
        title.textContent = `Name: ${product.productname}`;
        card.appendChild(title);

        const location = document.createElement("p");
        location.textContent = product.productlocation;
        card.appendChild(location);

        const stock = document.createElement("p");
        stock.textContent = `Available Stock: ${product.itemstock}`;
        card.appendChild(stock);

        const retailPrice = document.createElement("p");
        retailPrice.textContent = `Retail Price: ${product.itemprice}`;
        card.appendChild(retailPrice);

        const wholesalePrice = document.createElement("p");
        wholesalePrice.textContent = `Wholesale Price: ${product.wholesaleprice}`;
        card.appendChild(wholesalePrice);

        const buyButton = document.createElement("button");
        buyButton.className = "btn";
        buyButton.textContent = "Buy";
        buyButton.addEventListener("click", () => {
          // Prompt the user for the amount of stock to be purchased
          const purchasedAmount = prompt(
            "Enter the amount of stock to be purchased:"
          );
          if (
            purchasedAmount !== null &&
            purchasedAmount !== "" &&
            !isNaN(purchasedAmount) &&
            parseInt(purchasedAmount) > 0
          ) {
            const newStock = product.itemstock - purchasedAmount;
            // Make a request to update the API with the amount of stock purchased
            fetch(`https://my-json-server.typicode.com/BabaMboga/Find-a-Farmer/products/${product.id}`, {
              method: "PATCH",
              body: JSON.stringify({ itemstock: newStock }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((updatedItem) => {
                // Update the card with the new stock information
                stock.textContent = `Available Stock: ${updatedItem.itemstock}`;
                if (updatedItem.itemstock === 0) {
                  buyButton.textContent = "Sold Out";
                  buyButton.disabled = true;
                }
              })
              .catch((error) => {
                console.error(error);
                alert("Failed to update the amount of stock purchased.");
              });
            if (product.itemstock === 0) {
              buyButton.textContent = "Sold Out";
              buyButton.disabled = true;
            }
          }
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          // Make a request to delete the product from the API
          fetch(`db.json/${product.id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to delete product");
              }
              // Remove the card from the gallery container
              galleryContainer.removeChild(card);
            })
            .catch((error) => {
              console.error(error);
              alert("Failed to delete product from the API.");
            });
        });

        card.appendChild(buyButton);
        card.appendChild(deleteButton);
        galleryContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to fetch products from the API.");
    });

  const addItemsButton = document.getElementById("addItems");
  addItemsButton.addEventListener("click", () => {
    //promp the user to enter the details of the new item
    const newProduct = {};
    newProduct.productname = prompt("Enter the product name:");
    newProduct.productimage = prompt("Enter the product image URL:");
    newProduct.productlocation = prompt("Enter the product location:");
    newProduct.itemstock = prompt("Enter the product stock:");
    newProduct.Firstname = prompt("Enter the owner's First Name:");
    newProduct.Secondname = prompt("Enter the owner's Second Name:");
    newProduct.farmerContactnumber = prompt(
      "Enter the owner's Contact Number:"
    );
    newProduct.itemprice = prompt("Enter the product's retail price:");
    newProduct.wholesaleprice = prompt("Enter the product's wholesale price:");

    if (
      newProduct.productname &&
      newProduct.productimage &&
      newProduct.productlocation &&
      newProduct.itemstock &&
      newProduct.Firstname &&
      newProduct.Secondname &&
      newProduct.farmerContactnumber &&
      newProduct.itemprice &&
      newProduct.wholesaleprice
    ) {
      fetch("https://my-json-server.typicode.com/BabaMboga/Find-a-Farmer/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((newItem) => {
          // create a card for the new item and add it to the gallery
          const newCard = document.createElement("div");
          newCard.ckassKist.add("card");

          const newImage = document.createElement("img");
          newImage.src = newItem.productimage;
          newCard.appendChild(newImage);

          const newTitle = document.createElement("h3");
          newTitle.textContent = newItem.productname;
          newCard.appendChild(newTitle);

          const newLocation = document.createElement("p");
          newLocation.textContent = newItem.productlocation;
          card.appendChild(newLocation);

          const newStock = document.createElement("p");
          newStock.textContent = `Available Stock: ${newItem.itemstock}`;
          card.appendChild(newStock);

          const newRetailPrice = document.createElement("p");
          newRetailPrice.textContent = `Retail Price: ${newItem.itemprice}`;
          card.appendChild(newRetailPrice);

          const newWholesalePrice = document.createElement("p");
          newWholesalePrice.textContent = `Wholesale Price: ${newItem.wholesaleprice}`;
          card.appendChild(newWholesalePrice);

          const newBuyButton = document.createElement("button");
          newBuyButton.className = "btn";
          newBuyButton.textContent = "Buy";
          newBuyButton.addEventListener("click", () => {
            //prompt the user for the amount of stock to be purchsded
            const purchasedAmount = prompt(
              "Enter the emount of stock to be purchased:"
            );

            if (
              purchasedAmount !== null &&
              purchasedAmount !== "" &&
              !isNaN(purchasedAmount) &&
              parseInt(purchasedAmount) > 0
            ) {
              const newStockAmount = newItem.itemstock - purchasedAmount;
              //Make a request to update the API with the amount of stock purchased
              fetch(`https://my-json-server.typicode.com/BabaMboga/Find-a-Farmer/products/${newItem.id}`, {
                method: "PATCH",
                body: JSON.stringify({ itemstock: newStockAmount }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((updatedItem) => {
                  //Update the card with the new stock infomation
                  newStock.textContent = `${updatedItem.itemstock}`;
                  if (updatedItem.itemstock === 0) {
                    newBuyButton.textContent = "Sold Out";
                    newBuyButton.disabled = true;
                  }
                })
                .catch((error) => {
                  console.error(error);
                  alert("Failed to update the amount of stock purchased.");
                });
              if (newItem.itemstock === 0) {
                newBuyButton.textContent = "Sold Out";
                newBuyButton.disabled = true;
              }
            }
          });
          newCard.appendChild(newBuyButton);

          const newDeleteButton = document.createElement("button");
          newDeleteButton.textContent = "Delete";
          newDeleteButton.addEventListener("click", () => {
            // Make a request to delete the item from the API
            fetch(`https://my-json-server.typicode.com/BabaMboga/Find-a-Farmer/products/${newItem.id}`, {
              method: "DELETE",
            })
              .then(() => {
                //remove the card from the gallery
                newCard.remove();
              })
              .catch((error) => {
                console.error(error);
                alert("Failed to delete the item.");
              });
          });
          newCard.appendChild(newDeleteButton);

          galleryContainer.appendChild(newCard);
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to add the item to the API.");
        });
    } else {
      alert("Please enter all details to add a new item.");
    }
  });
});
