const kart = document.getElementById('kart');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('TotalPrice');

let cart = [];
let totalPrice = 0;

fetch('https://fakestoreapi.com/products?limit=10')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        generator(data);
    });

function generator(data) {
    kart.innerHTML = ''; 
    data.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${element.image}" alt="">
            <h2>${element.title}</h2>
            <p>${element.description.slice(0, 50)}....</p>
            <h3>${element.price} $</h3>
            <button onclick="addToCart(${element.id}, '${element.title}', ${element.price})">Add to Cart</button>
        `;
        kart.appendChild(card);
    });
}

function addToCart(id, title, price) {
    const item = { id, title, price };
    cart.push(item);

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.title} - $${item.price}`;
        cartItems.appendChild(cartItem);
    });

    totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.innerHTML = `Total: $${totalPrice}`;
}