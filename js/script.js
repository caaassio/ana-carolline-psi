// Dropdown button
document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.querySelector('header ul');

    menuBtn.addEventListener('click', function() {
      menu.classList.toggle('show');
    });
  });

// Show foto  
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".foto-home").classList.add("show");
});  

// Carrossel
    // Move os slides
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

// Move os slides
document.querySelector(".carousel-container").style.transform = 
    `translateX(${-currentIndex * 100}%)`;

// Atualiza os indicadores (bolinhas)
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    document.querySelector(".prev").addEventListener("click", () => showSlide(currentIndex - 1));
    document.querySelector(".next").addEventListener("click", () => showSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => showSlide(i));
    });

    // Inicializa o carrossel no primeiro slide
    showSlide(currentIndex);

// FAQ

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        faqItem.classList.toggle('expanded');
    });
});
