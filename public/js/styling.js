
const navbar = document.querySelector('.navbar');



window.onscroll = () => {
    if (window.scrollY > 80) {
        navbar.classList.add('navbar-style');
    } else { 
        navbar.classList.remove('navbar-style');
    }
// console.log(window.pageYOffset);
};