// Scroll reveal animation
const fadeElements = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// Smooth scroll to contacts
function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
}


// Typing animation
const text = "Привет! Я Диана начинающий Frontend разработчик";
let index = 0;

function type() {
    if (index < text.length) {
        document.getElementById("typed-text").textContent += text.charAt(index);
        index++;
        setTimeout(type, 55); // скорость печати
    }
}

type();
