
function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
}
function scrollToPortfolio() {
    document.querySelector('#portfolio').scrollIntoView({
        behavior: 'smooth'
    });
}


document.addEventListener("DOMContentLoaded", () => {


    const fadeElements = document.querySelectorAll('.fade');

    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach(el => scrollObserver.observe(el));
    initTypingEffect();
    initCustomCursor();
    initBackgroundParallax();
});


const messageText = "Привет! Я Диана Frontend-разработчик";
let textIndex = 0;

let typingTimeout;

function initTypingEffect() {
    clearTimeout(typingTimeout);
    const target = document.getElementById("typed-text");
    target.textContent = "";
    const text = translations[currentLanguage].heroTitle;
    let index = 0;
    function type() {
        if (index < text.length) {
            target.textContent += text.charAt(index);
            index++;
            typingTimeout = setTimeout(type, 60);
        }
    }
    type();

}


function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;


    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });


    const interactiveElements = document.querySelectorAll('a, button, .project-flip-card, .chip');

    interactiveElements.forEach(element => {

        element.addEventListener('mouseenter', () => {
            document.body.classList.add('hovered-link');
        });

        element.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovered-link');
        });
    });
}


function initBackgroundParallax() {
    const sphere1 = document.querySelector('.sphere-1');
    const sphere2 = document.querySelector('.sphere-2');
    const sphere3 = document.querySelector('.sphere-3');

    if (!sphere1 || !sphere2 || !sphere3) return;

    document.addEventListener('mousemove', (e) => {

        const mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
        const mouseY = (e.clientY - window.innerHeight / 2) * 0.02;


        sphere1.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        sphere2.style.transform = `translate(${-mouseX * 1.3}px, ${-mouseY * 1.3}px)`;
        sphere3.style.transform = `translate(${mouseX * 0.7}px, ${-mouseY * 0.7}px)`;
    });
}

const ruBtn = document.getElementById("ruBtn");
const enBtn = document.getElementById("enBtn");

let currentLanguage =
    localStorage.getItem("language") || "ru";

updateLanguageButtons();

ruBtn.addEventListener("click", () => {
    currentLanguage = "ru";
    localStorage.setItem("language","ru");
    updateLanguageButtons();
});

enBtn.addEventListener("click", () => {
    currentLanguage = "en";
    localStorage.setItem("language","en");
    updateLanguageButtons();
});

function updateLanguageButtons(){

    ruBtn.classList.toggle(
        "active",
        currentLanguage==="ru"
    );

    enBtn.classList.toggle(
        "active",
        currentLanguage==="en"
    );

    applyTranslations();
    initTypingEffect();

}

function applyTranslations(){
    const dict = translations[currentLanguage];
    document.title = dict.pageTitle;
    document.querySelectorAll("[data-lang]").forEach(element=>{
        const key = element.dataset.lang;
        if(dict[key]){
            element.textContent = dict[key];
        }
    });
       document.documentElement.lang = currentLanguage;


}