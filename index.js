document.addEventListener('DOMContentLoaded',() => {
    const galleryContainer = document.querySelector('.card-container');

    //Make a request to the API
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
            title.textContent = product.productname;
            card.appendChild(title);

            const location = document.createElement('p');
            location.textContent = product.productlocation;
            card.appendChild(location);

            const stock = document.createElement('p');
            stock.textContent = product.itemstock;
            card.appendChild(stock);

            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy';
            buyButton.addEventListener('click', () => {
                
            })

        })
    })


})