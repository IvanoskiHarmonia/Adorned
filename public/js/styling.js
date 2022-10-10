window.onload = () => {
    addNavStyle();
}



const navbar = document.querySelector('.navbar');

var prevScrollpos = window.pageYOffset;

window.onscroll = () => {
    hideNav();
    addNavStyle();
};








// Navbar scroll effects

// hideNav
const hideNav = () => {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        prevScrollpos = currentScrollPos;
        navbar.style.top = "0";
    }
     else {
        navbar.style.top = "-80px";
        prevScrollpos = currentScrollPos;
    }
}

// addNavStyle
const addNavStyle = () => {
    if (window.scrollY > 80) navbar.classList.add('navbar-style');
    else  navbar.classList.remove('navbar-style');
}