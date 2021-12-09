// show cart

document.getElementById("cart-info").addEventListener('click', function() {
    const cart = document.getElementById("cart");
    cart.classList.toggle('show-cart');
});


// display all sweets

const store = document.querySelector('.store-items');
const sweets = [];


// cook sweets

makeSweet('sweet Item', 'images/sweets-1.jpg', '5', 'sweeties');
makeSweet('sweet Item', 'images/sweets-2.jpg', '10', 'sweeties');
makeSweet('sweet Item', 'images/sweets-3.jpg', '15', 'sweeties');

makeSweet('cake Item', 'images/cake-1.jpg', '5', 'cakes');
makeSweet('cake Item', 'images/cake-2.jpg', '10', 'cakes');
makeSweet('cake Item', 'images/cake-3.jpg', '15', 'cakes');

makeSweet('cupcake Item', 'images/cupcake-1.jpg', '5', 'cupcakes');
makeSweet('cupcake Item', 'images/cupcake-2.jpg', '10', 'cupcakes');
makeSweet('cupcake Item', 'images/cupcake-3.jpg', '15', 'cupcakes');

makeSweet('doughnut Item', 'images/doughnut-1.jpg', '5', 'doughnuts');
makeSweet('doughnut Item', 'images/doughnut-2.jpg', '10', 'doughnuts');
makeSweet('doughnut Item', 'images/doughnut-3.jpg', '15', 'doughnuts');

const specialSweets = sweets.filter(sweet => sweet.type === true);


// content loaded

document.addEventListener('DOMContentLoaded', () => {

    store.innerHTML = '';

    let output = '';

    sweets.forEach(sweet => {
        output += `<div class="col-10 mx-auto col-sm-6 col-lg-4 my-3 store-item ${sweet.type} sweets" data-item="sweets">
            <div class="card single-item">
                <div class="img-container">
                    <img src="${sweet.img}" alt="store image" class="card-img-top store-img">
                    <span class="store-item-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </span>
                </div>
                <div class="card-body">
                    <div class="card-text d-flex justify-content-between text-capitalize">
                        <h5 class="store-item-name">${sweet.name}</h5>
                        <h5 class="store-item-value">$ <strong class="font-weight-bold" id="store-item-price">${sweet.price}</strong></h5>
                    </div>
                </div>
            </div>
        </div>`
    })

    store.innerHTML = output;

    addToCart();

});


// filter sweets

const filterSweets = (() => {

    const filter = document.querySelectorAll('.filter-btn');

    filter.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const value = event.target.dataset.filter;
            const singleSweet = document.querySelectorAll('.store-item');

            singleSweet.forEach(sweet => {
                if (value === 'all') {
                    sweet.style.display = 'block';
                } else {
                    (!sweet.classList.contains(value)) ? sweet.style.display = 'none': sweet.style.display = 'block';
                }
            })
        })
    })

})();


// store

function Sweet(name, img, price, type) {
    this.name = name;
    this.img = img;
    this.price = price;
    this.type = type;
}


// sweet creation function

function makeSweet(name, img, price = 5, type) {
    const sweet = new Sweet(name, img, price, type);
    sweets.push(sweet);
}


// add items to the cart

function addToCart() {

    const cartBtn = document.querySelectorAll('.store-item-icon');

    cartBtn.forEach(btn => {
        btn.addEventListener('click', function(e) {

            if (e.target.parentElement.classList.contains('store-item-icon')) {
                let fullPath = e.target.parentElement.previousElementSibling.src;

                let pos = fullPath.indexOf('images') + 6;
                let partPath = fullPath.slice(pos);

                const item = {};
                item.img = `cart-img${partPath}`;

                let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name = name;
                let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;

                const cartItem = document.createElement('div');

                cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');

                cartItem.innerHTML = `<img src="${item.img}" alt="cart item" class="img-fluid rounded-circle" id="item-img">
                        <div class="item-text">
                            <p id="cart-item-title" class="font-weight-bold mb-0">
                                ${item.name}
                            </p>
                            <span>$</span>
                            <span id="cart-item-price" class="cart-item-price mb-0">
                                ${item.price}
                            </span>
                        </div>
                        <a href="#" id="cart-item-remove" class="cart-item-remove">
                            <i class="fas fa-trash"></i>
                        </a>`;

                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');

                cart.insertBefore(cartItem, total);
                alert('Item added to the cart!');
                showTotals();
            }
        });
    });
}


// show total items

function showTotals() {
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');

    items.forEach(item => {
        total.push(parseFloat(item.textContent));
    });

    const totalMoney = total.reduce((total, item) => {
        total += item;
        return total;
    }, 0);

    const finalMoney = totalMoney.toFixed(2);

    document.getElementById('cart-total').innerHTML = finalMoney;
    document.querySelector('.item-total').innerHTML = finalMoney;
    document.getElementById('item-count').innerHTML = total.length;
}

const clearCart = document.getElementById('clear-cart');
clearCart.addEventListener('click', function() {
    item.img = item.name = item.price = '';
});