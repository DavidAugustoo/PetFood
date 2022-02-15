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

let modalQt = 1;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

productsJson.map((item, index) => {
    let productItem = c('.models .products-card').cloneNode(true);

    productItem.setAttribute('data-key', index,);
    productItem.querySelector('.products-card--image img').src = item.img;
    productItem.querySelector('.products-card--brand').innerHTML = item.brand;
    productItem.querySelector('.products-card--name').innerHTML = item.name;
    productItem.querySelector('.products-card--price').innerHTML = `R$ ${item.price}`;
    productItem.addEventListener('click', (e) => {
        e.preventDefault();
        let modalQt = 1;

        let key = e.target.closest('.products-card').getAttribute('data-key');
        
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