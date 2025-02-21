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
window.onload = () => {
  const carrosselItems = document.querySelectorAll('.carrossel-item');
  let currentIndex = 0;

  const hideAllItems = () => {
      carrosselItems.forEach(item => {
          item.style.display = 'none';
      });
  };

  const showCurrentItem = () => {
      hideAllItems(); 
      carrosselItems[currentIndex].style.display = 'flex'; 
  };

  showCurrentItem();

  setInterval(() => {
      currentIndex = (currentIndex + 1) % carrosselItems.length; 
      showCurrentItem(); 
  }, 9000); 
};

// FAQ

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        faqItem.classList.toggle('expanded');
    });
});
