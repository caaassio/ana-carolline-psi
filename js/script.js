// Dropdown button

document.addEventListener("DOMContentLoaded", function() {

    fetch("header.html")
        .then(response => response.text())
        .then(data =>{
            document.getElementById('header-container').innerHTML = data;

    const menuBtn = document.getElementById('menu-btn');
    const menu = document.querySelector('header ul');

    menuBtn.addEventListener('click', function() {
      menu.classList.toggle('show');
    });
  });
});


// Show foto  
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".foto-home").classList.add("show");
});  


// Carrossel

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

    document.querySelector(".carousel-container").style.transform = 
        `translateX(${-currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    document.querySelector(".prev").addEventListener("click", () => showSlide(currentIndex - 1));
    document.querySelector(".next").addEventListener("click", () => showSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => showSlide(i));
    });

    showSlide(currentIndex);

// FAQ

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        faqItem.classList.toggle('expanded');
    });
});


// Transparência botão back to top

window.addEventListener("scroll", function () {
    let btt = document.querySelector(".btt");

    if (window.scrollY > 0) {
        btt.style.opacity = "0.5"; 
    } else {
        btt.style.opacity = "1"; 
    }
});