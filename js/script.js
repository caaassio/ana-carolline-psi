//----------------- header e toggle do menu ---------------
document.addEventListener("DOMContentLoaded", function () {
  const isGitHubPages = window.location.hostname.includes("github.io");
  const repoName = "/ana-carolline-psi";
  const basePath = isGitHubPages ? repoName + "/" : "/";

  fetch(basePath + "components/elements/header.html")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
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

      // Menu toggle
      const menuBtn = document.getElementById("menu-btn");
      const menu = document.querySelector("header ul");

      if (menuBtn && menu) {
        menuBtn.addEventListener("click", function () {
          menu.classList.toggle("show");
        });

        // Recolher menu ao clicar em um link
        const links = menu.querySelectorAll("a");
        links.forEach(link => {
          link.addEventListener("click", () => {
            menu.classList.remove("show");
          });
        });
      }

      // Links do header
      document.querySelectorAll("#header-container a, #header-container #logo img").forEach(element => {
        let attr = element.tagName === "A" ? "href" : "src";
        let value = element.getAttribute(attr);
        if (!value.startsWith("http") && !value.startsWith("#")) {
          if (isGitHubPages) {
            value = value.replace(/^\.\.\//, "/");
            if (!value.startsWith("/")) value = "/" + value;
            element.setAttribute(attr, repoName + value);
          } else {
            element.setAttribute(attr, value.startsWith("../") ? value.replace(/^\.\.\//, "/") : value);
          }
        }
      });

      const header = document.querySelector("#header-container header");
      let lastScrollTop = 0;

      window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 50) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      });

    })
    .catch(error => {
      console.error("Erro ao carregar o header:", error);
    });

  // Footer
  fetch(basePath + "components/elements/footer.html")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch(error => {
      console.error("Erro ao carregar o footer:", error);
    });

    // Botão  para voltar ao topo
    fetch(basePath + "components/elements/btt.html")
      .then(response => response.text())
      .then(data => document.getElementById("btt").innerHTML = data);

    // Botão voltar blog/post
    fetch(basePath + "components/elements/btn-voltar.html")
      .then(response => response.text())
      .then(data => document.getElementById("btn-voltar").innerHTML = data);


// --------------------- FOTO-HOME -------------------------
  document.querySelector(".foto-home")?.classList.add("show");


// ----------------------- CARROSSEL ABOUT --------------------

  const slides = document.querySelectorAll('.foto-slide');
  let indexAtual = 0;

  setInterval(() => {
    slides[indexAtual].classList.remove('ativo');
    indexAtual = (indexAtual + 1) % slides.length;
    slides[indexAtual].classList.add('ativo');
  }, 8000); 


// --------------------- FAQ -------------------------
  const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

  accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
      const currentlyActive = document.querySelector(".accordion-item-header.active");
      if (currentlyActive && currentlyActive !== accordionItemHeader) {
        currentlyActive.classList.toggle("active");
        currentlyActive.nextElementSibling.style.maxHeight = 0;
      }

      accordionItemHeader.classList.toggle("active");
      const body = accordionItemHeader.nextElementSibling;

      if (accordionItemHeader.classList.contains("active")) {
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        body.style.maxHeight = 0;
      }
    });
  });

// ---------------------- Transição dos accordions ----------------------
  document.querySelectorAll(".accordion-item").forEach(item => {
    item.addEventListener("mouseleave", () => {
      item.style.transition = "filter 0.5s ease-out, transform 0.5s ease-out";
      setTimeout(() => {
        item.style.transition = "";
      }, 500);
    });
  });

// ---------------------- Transição dos botões ----------------------
  document.querySelectorAll("button").forEach(item => {
    item.addEventListener("mouseleave", () => {
      item.style.transition = "filter 0.5s ease-out, transform 0.5s ease-out";
      setTimeout(() => {
        item.style.transition = "";
      }, 500);
    });
  });

// ---------------------- Back to Top ----------------------
function ativarBtt() {
  const btt = document.querySelector(".btt");
  
  window.addEventListener("scroll", () => {
    btt.style.opacity = window.scrollY > 0 ? "0.3" : "1";
  });
  
  btt.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
  });
  
}

document.addEventListener("DOMContentLoaded", ativarBtt);

setTimeout(ativarBtt, 500);

// ---------------------- Swiper ----------------------
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
