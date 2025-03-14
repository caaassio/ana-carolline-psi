document.addEventListener("DOMContentLoaded", function () {
    // Define o caminho base dinamicamente
    let basePath = window.location.pathname.includes("/posts/") ? "../" : "./";

    // Carrega o header.html
    fetch(basePath + "header.html")
        .then(response => response.text())
        .then(data => {
            // Insere o header no DOM
            document.getElementById("header-container").innerHTML = data;

            // Adiciona os links de CSS via JavaScript
            const link1 = document.createElement("link");
            link1.rel = "stylesheet";
            link1.href = basePath + "css/estilo-header.css"; // Caminho relativo para o CSS
            document.head.appendChild(link1);

            const link2 = document.createElement("link");
            link2.rel = "stylesheet";
            link2.href = basePath + "css/estilo.css"; // Caminho relativo para o CSS
            document.head.appendChild(link2);

            // Configura o menu dropdown
            const menuBtn = document.getElementById("menu-btn");
            const menu = document.querySelector("header ul");

            if (menuBtn && menu) {
                menuBtn.addEventListener("click", function () {
                    menu.classList.toggle("show");
                });
            }

            // Ajusta os links do header para funcionar no GitHub Pages e no Live Server
            const isGitHubPages = window.location.hostname.includes("github.io");
            const repoName = "/ana-carolline-psi"; // Nome do repositório no GitHub Pages

            document.querySelectorAll("#header-container a").forEach(link => {
                let href = link.getAttribute("href");
                if (!href.startsWith("http") && !href.startsWith("#")) { // Evita modificar links externos e âncoras
                    if (isGitHubPages) {
                        // No GitHub Pages, adiciona o nome do repositório ao início do link
                        if (href.startsWith("../")) {
                            href = href.replace(/^\.\.\//, "/"); // Remove o ../ e adiciona /
                        }
                        link.setAttribute("href", repoName + href);
                    } else {
                        // No Live Server, mantém o link como está
                        link.setAttribute("href", href);
                    }
                }
            });
        })
        .catch(error => console.error("Erro ao carregar o header:", error));

    // Show foto  
    document.querySelector(".foto-home")?.classList.add("show");

    // Carrossel
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

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

        document.querySelector(".prev")?.addEventListener("click", () => showSlide(currentIndex - 1));
        document.querySelector(".next")?.addEventListener("click", () => showSlide(currentIndex + 1));

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => showSlide(i));
        });

        showSlide(currentIndex);
    }

    // FAQ
    document.querySelectorAll(".faq-question").forEach(question => {
        question.addEventListener("click", function () {
            const faqItem = this.closest(".faq-item");
            if (faqItem) {
                faqItem.classList.toggle("expanded");
            }
        });
    });

    // Transparência botão back to top
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