// Menu mobile

let menuMobile = document.querySelector('.menu-mobile');
let menuCartMobile = document.querySelector('.cart-mobile');

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

// Listagem de Produtos

let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

productsJson.map((item, index) => {
    let productItem = c('.models .products-card').cloneNode(true);

    productItem.setAttribute('data-key', index);
    productItem.querySelector('.products-card--image img').src = item.img;
    productItem.querySelector('.products-card--brand').innerHTML = item.brand;
    productItem.querySelector('.products-card--name').innerHTML = item.name;
    productItem.querySelector('.products-card--price').innerHTML = `R$ ${item.price}`;

    // Listagem de produtos no modal

    productItem.addEventListener('click', (e) => {
        e.preventDefault();
        c('.cart-container').classList.add('closed');
        let modalQt = 1;

        let key = e.target.closest('.products-card').getAttribute('data-key');
        modalKey = key;
        
        c('.products-modal--image img').src = productsJson[key].img;
        c('.products-modal--info h1').innerHTML = productsJson[key].name;
        c('.products-modal--info p').innerHTML = productsJson[key].description;
        c('.products-modal--actualPrice').innerHTML = `R$ ${productsJson[key].price}`;
        cs('.products-modal--size').forEach((size, sizeIndex) => {
            size.querySelector('p').innerHTML = productsJson[key].sizes[sizeIndex];
        });
        
        c('.products-modal--qt').innerHTML = modalQt;

        c('.products-modal').style.display = 'flex';
        c('.products-modal').style.opacity = '0';

        setTimeout(() => {
            c('.products-modal').style.opacity = '1';
        });
        
    });


    c('.products-area').append(productItem);
}); 

cs('.products-modal--size').forEach((size) => {
    size.addEventListener('click', (el) => {
        c('.products-modal--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })
})

c('.products-modal--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--;
        c('.products-modal--qt').innerHTML = modalQt;
    }
});


c('.products-modal--qtmais').addEventListener('click', () => {
    if(modalQt >= 1) {
        modalQt++;
        c('.products-modal--qt').innerHTML = modalQt;
    }
});

c('.products-modal--button-close').addEventListener('click', (e) => {
    e.preventDefault();

    closeModal();
});


function closeModal() {
    c('.products-modal').style.opacity = '0';

    setTimeout(() => {
        c('.products-modal').style.display = 'none';
    }, 500);
    
}

// Carrinho

let cartMenu = c('.menu--item i').addEventListener('click', () => {

    let cartArea = c('.cart-container');

    if(cartArea.classList.contains('closed')) {
        cartArea.classList.remove('closed');
    } else {
        cartArea.classList.add('closed');
    }
    
});

let cartMenuMobile = c('.cart-mobile').addEventListener('click', () => {

    let cartArea = c('.cart-container');

    if(cartArea.classList.contains('closed')) {
        cartArea.classList.remove('closed');
    } else {
        cartArea.classList.add('closed');
    }
    
});


c('.products-modal--button-add').addEventListener('click', (e) => {
    e.preventDefault();

    let size = parseInt(c('.products-modal--size.selected').getAttribute('data-key'));
    let identifier = productsJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: productsJson[modalKey].id,
            size,
            qt: modalQt,
        });

        modalQt = 1;
    };

    updateCart();
    closeModal();
 
});

function updateCart() {

    if(cart.length > 0) {
        c('.cart-container').classList.remove('closed');
        c('.cart-product-area').innerHTML = '';

        let total = 0;
        let frete = 99;

        for(let i in cart){
            let productItem = productsJson.find((item) => {
                return item.id == cart[i].id;
            });

            total += productItem.price * cart[i].qt;

            cartItem = c('.cart-modal .cart-product').cloneNode(true);

            cartItem.querySelector('img').src = productItem.img;
            cartItem.querySelector('.products-cart--brand').innerHTML = productItem.brand;
            cartItem.querySelector('.products-cart--name').innerHTML = productItem.name;
            cartItem.querySelector('.products-cart--price').innerHTML = `R$ ${productItem.price}`;
            cartItem.querySelector('.cart--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--qtmais').addEventListener('click', () => {
                cart[i].qt++;    
                updateCart();
            });

            c('.cart-product-area').append(cartItem);

        }
        
        frete = frete - total;

        c('.cart-info--price').innerHTML = `R$ ${total.toFixed(2)}`;

        if(total < 99) {
            c('.cart-info--frete').innerHTML = `Faltam R$ ${frete.toFixed(2)} para receber frete grátis`;
        } else {
            c('.cart-info--frete').innerHTML = `Parabéns! Frete grátis aplicado`;
        }
        
        

    } else {
        c('.cart-container').classList.add('closed');
        c('.cart-product-area').innerHTML = '';
        c('.cart-info--price').innerHTML = `R$ 0`;
        c('.cart-info--frete').innerHTML = ``;
    }
}

