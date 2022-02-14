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