// ---------------- ajuste de caminho -----------------------
document.addEventListener("DOMContentLoaded", function () {
  // Definir o basePath com base no ambiente
  const isGitHubPages = window.location.hostname.includes("github.io");
  const repoName = "/ spi";
  const basePath = isGitHubPages ? repoName + "/" : "/";

  // Carregar o header
  fetch(basePath + "header.html")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("header-container").innerHTML = data;

      // Adicionar CSS dinamicamente
      const link1 = document.createElement("link");
      link1.rel = "stylesheet";
      link1.href = basePath + "css/estilo-header.css";
      document.head.appendChild(link1);

      const link2 = document.createElement("link");
      link2.rel = "stylesheet";
      link2.href = basePath + "css/estilo.css";
      document.head.appendChild(link2);

      // Configurar o menu toggle
      const menuBtn = document.getElementById("menu-btn");
      const menu = document.querySelector("header ul");
      if (menuBtn && menu) {
        menuBtn.addEventListener("click", function () {
          menu.classList.toggle("show");
        });
      }

      // Ajustar links e logo
      document.querySelectorAll("#header-container a, #header-container #logo img").forEach(element => {
        let attr = element.tagName === "A" ? "href" : "src";
        let value = element.getAttribute(attr);
        if (!value.startsWith("http") && !value.startsWith("#")) {
          if (isGitHubPages) {
            value = value.replace(/^\.\.\//, "/");
            element.setAttribute(attr, repoName + value);
          } else {
            element.setAttribute(attr, value.startsWith("../") ? value.replace(/^\.\.\//, "/") : value);
          }
        }
      });
    })
    .catch(error => {
      console.error("Erro ao carregar o header:", error);
      console.log("URL tentada:", basePath + "header.html");
    });

  // Carregar o footer
  fetch(basePath + "footer.html")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch(error => {
      console.error("Erro ao carregar o footer:", error);
      console.log("URL tentada:", basePath + "footer.html");
    });
});


// --------------------- Show foto - Tô usando? -----------------------------------------
    document.querySelector(".foto-home")?.classList.add("show");

// ------------------------ Carrossel ---------------------------------------------------
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const intervalTime = 30000; 
    let autoSlide;

    if (slides.length > 0 && dots.length > 0) {
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

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            showSlide(currentIndex + 1);
        }, intervalTime);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    document.querySelector(".prev")?.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        resetAutoSlide();
    });

    document.querySelector(".next")?.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        resetAutoSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            showSlide(i);
            resetAutoSlide();
        });
    });

    showSlide(currentIndex);
    startAutoSlide(); 
}

// ------------------------------ FAQ -----------------------------------------------

const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader =>{
    accordionItemHeader.addEventListener("click", event =>{

        const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
        if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader){
            currentlyActiveAccordionItemHeader.classList.toggle("active");
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }

        accordionItemHeader.classList.toggle("active"); 
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")){
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        }else{
            accordionItemBody.style.maxHeight = 0;
        }
    });
});

// ---------------------- efeito de transição do accordion ----------------------

document.querySelectorAll(".accordion-item").forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.transition = "filter 0.5s ease-out, transform 0.5s ease-out";
        
        setTimeout(() => {
            item.style.transition = ""; 
        }, 500);
    });
});


// ------------------ efeito de transição dos buttons --------------------------

document.querySelectorAll("button").forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.transition = "filter 0.5s ease-out, transform 0.5s ease-out";
        
        setTimeout(() => {
            item.style.transition = ""; 
        }, 500);
    });
});


// -------------------------------- Transparência botão back to top ---------------------------
window.addEventListener("scroll", function () {
    let btt = document.querySelector(".btt");

        if (btt) {
            if (window.scrollY > 0) {
                btt.style.opacity = "0.5";
            } else {
                btt.style.opacity = "1";
            }
        }
    });

// ------------------------- Swipe -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    if (typeof Swiper !== "undefined") {
        new Swiper(".swiper", {
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 30000,
                disableOnInteraction: false,
            },
            spaceBetween: 20,
            grabCursor: true,
        });
    }
});