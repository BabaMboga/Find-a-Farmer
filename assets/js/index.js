document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('loginForm').reset();
    const galleryContainer = document.querySelector('.card-container');
  
    // Make a request to the API
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        // Loop through the data and create a card for each item
        products.forEach((product) => {
          const card = document.createElement('div');
          card.classList.add('card');
  
          const image = document.createElement('img');
          image.src = product.productimage;
          card.appendChild(image);
  
          const title = document.createElement('h3');
          title.textContent = `Name: ${product.productname}`;
          card.appendChild(title);
  
          const location = document.createElement('p');
          location.textContent = product.productlocation;
          card.appendChild(location);
  
          const stock = document.createElement('p');
          stock.textContent = `Available Stock: ${product.itemstock}`;
          card.appendChild(stock);

          const retailPrice = document.createElement('p');
          retailPrice.textContent = `Retail Price: ${product.itemprice}`;
          card.appendChild(retailPrice);

          const wholesalePrice = document.createElement('p');
          wholesalePrice.textContent = `Wholesale Price: ${product.wholesaleprice}`;
          card.appendChild(wholesalePrice);
  
          const buyButton = document.createElement('button');
          buyButton.className = 'btn' ;
          buyButton.textContent = 'Buy';
          buyButton.addEventListener('click', () => {
            // Prompt the user for the amount of stock to be purchased
            const purchasedAmount = prompt('Enter the amount of stock to be purchased:');
            if (purchasedAmount !== null && purchasedAmount !== '' && !isNaN(purchasedAmount) && parseInt(purchasedAmount) > 0) {
              const newStock = product.itemstock - purchasedAmount;
              // Make a request to update the API with the amount of stock purchased
              fetch(`http://localhost:3000/products/${product.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ itemstock: newStock }),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(response => response.json())
                .then(updatedItem => {
                  // Update the card with the new stock information
                  stock.textContent = `Available Stock: ${updatedItem.itemstock}`;
                  if (updatedItem.itemstock === 0) {
                    buyButton.textContent = 'Sold Out';
                    buyButton.disabled = true;
                  }
                })
                .catch(error => {
                  console.error(error);
                  alert('Failed to update the amount of stock purchased.');
                });
              if (product.itemstock === 0) {
                buyButton.textContent = 'Sold Out';
                buyButton.disabled = true;
              }
            }
          });
  
          const deleteButton = document.createElement('button');
          deleteButton.className = 'btn';
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => {
            // Make a request to delete the product from the API
            fetch(`http://localhost:3000/products/${product.id}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to delete product');
                }
                // Remove the card from the gallery container
                galleryContainer.removeChild(card);
              })
              .catch(error => {
                console.error(error);
                alert('Failed to delete product from the API.');
              });
          });
  
          card.appendChild(buyButton);
          card.appendChild(deleteButton);
          galleryContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error(error);
        alert('Failed to fetch products from the API.');
      });
  });
  