// --------------------------- Ajuste de caminhos ------------------------------
document.addEventListener("DOMContentLoaded", function () {
    let basePath = window.location.pathname.includes("/posts/") ? "../" : "./";

    fetch(basePath + "header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;

            const link1 = document.createElement("link");
            link1.rel = "stylesheet";
            link1.href = basePath + "css/estilo-header.css";
            document.head.appendChild(link1);

            const link2 = document.createElement("link");
            link2.rel = "stylesheet";
            link2.href = basePath + "css/estilo.css"; 
            document.head.appendChild(link2);

            const menuBtn = document.getElementById("menu-btn");
            const menu = document.querySelector("header ul");

            if (menuBtn && menu) {
                menuBtn.addEventListener("click", function () {
                    menu.classList.toggle("show");
                });
            }

            const isGitHubPages = window.location.hostname.includes("github.io");
            const repoName = "/ana-carolline-psi"; 

            document.querySelectorAll("#header-container a").forEach(link => {
                let href = link.getAttribute("href");
                if (!href.startsWith("http") && !href.startsWith("#")) { 
                    if (isGitHubPages) {
                        if (href.startsWith("../")) {
                            href = href.replace(/^\.\.\//, "/"); 
                        }
                        link.setAttribute("href", repoName + href);
                    } else {
                        link.setAttribute("href", href);
                    }
                }
            });

            const logo = document.querySelector("#header-container #logo img");
            if (logo) {
                let src = logo.getAttribute("src");
                if (isGitHubPages) {
                    if (src.startsWith("../")) {
                        src = src.replace(/^\.\.\//, "/"); 
                    }
                    logo.setAttribute("src", repoName + src);
                } else {
                    logo.setAttribute("src", src);
                }
            }
        })
        .catch(error => console.error("Erro ao carregar o header:", error));

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
});

// ----------------------------- Tempo de leitura ---------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const post = document.querySelector(".post-text"); 
    const texto = post.querySelector(".post-content").innerText;
    const palavrasPorMinuto = 200; 
    const numeroPalavras = texto.split(/\s+/).length; 
    const tempoLeitura = Math.ceil(numeroPalavras / palavrasPorMinuto);

    const tempoElemento = post.querySelector(".tempo-leitura");
    if (tempoElemento) {
        tempoElemento.innerHTML = ` ${tempoLeitura} min`;
    }
});

// ------------------------- Swipe -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper", {
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
            delay: 30000,  // Tempo de transição (em milissegundos)
            disableOnInteraction: false,
        },
        spaceBetween: 20,
        grabCursor: true,
    });
});

