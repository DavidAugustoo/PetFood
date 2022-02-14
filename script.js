// Menu mobile

let menuMobile = document.querySelector('.menu-mobile');

menuMobile.addEventListener('click', () => {
    let mobileArea = document.querySelector('.menu-mobile-area');

    if (mobileArea.classList.contains('closed')) {
        mobileArea.classList.remove('closed');
        mobileArea.classList.add('open');
    } else if (mobileArea.classList.contains('open')) {
        mobileArea.classList.remove('open');
        mobileArea.classList.add('closed');
    }

});

// Produtos

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

productsJson.map((item) => {
    let productItem = c('.models .products-card').cloneNode(true);

    productItem.querySelector('.products-card--image img').src = item.img;
    productItem.querySelector('.products-card--brand').innerHTML = item.brand;
    productItem.querySelector('.products-card--name').innerHTML = item.name;
    productItem.querySelector('.products-card--price').innerHTML = `R$ ${item.price}`;


    c('.products-area').append(productItem);
}); 