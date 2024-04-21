// Javascript for eligibilityChecker app

// Selecting Elements
const hamBurger = document.querySelector('.ham-burger');
const navLinks = document.querySelector('.nav-links');
const topRow= document.querySelector('.top-row');

// Hamburger Menu Event
hamBurger.addEventListener('click', ()=>{
    navLinks.classList.toggle('active');
    topRow.classList.toggle('active');
})