document.addEventListener("DOMContentLoaded", function () {
  const isGitHubPages = window.location.hostname.includes("github.io");
  const repoName = "/ana-carolline-psi";
  const basePath = isGitHubPages ? repoName + "/" : "/";

  // Carregar header
  fetch(basePath + "header.html")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      document.getElementById("header-container").innerHTML = data;

      // Adicionar CSS
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
      }

      // Corrigir links do header
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

      // ⬇️ Insira aqui os scripts que dependem do header, se houver
    })
    .catch(error => {
      console.error("Erro ao carregar o header:", error);
    });

  // Carregar footer
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
    });

  // --------------------- FOTO-HOME -------------------------
  document.querySelector(".foto-home")?.classList.add("show");

  // --------------------- CARROSSEL -------------------------
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const intervalTime = 30000;
  let autoSlide;

  if (slides.length > 0 && dots.length > 0) {
    function showSlide(index) {
      if (index < 0) currentIndex = slides.length - 1;
      else if (index >= slides.length) currentIndex = 0;
      else currentIndex = index;

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
  window.addEventListener("scroll", function () {
    let btt = document.querySelector(".btt");
    if (btt) {
      btt.style.opacity = window.scrollY > 0 ? "0.5" : "1";
    }
  });

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
        delay: 90000,
        disableOnInteraction: false,
      },
      spaceBetween: 20,
      grabCursor: true,
    });
  }
});

// ------------------------ leia mais ------------------------------
document.querySelectorAll(".leia-mais").forEach((botao) => {
  botao.addEventListener("click", function () {
    const secao = document.getElementById("depoimentos");

    if (secao.style.height === "97vh") {
      secao.style.height = "75vh";
      this.textContent = "Mostrar mais";
      this.classList.add("active"); // Remove sublinhado
    } else {
      secao.style.height = "97vh";
      this.textContent = "Mostrar menos";
      this.classList.remove("active"); // Adiciona sublinhado
    }
  });
});


