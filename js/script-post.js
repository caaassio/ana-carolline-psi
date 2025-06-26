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

// ----------------- header loader ------------------------
fetch("../header.html")
          .then(response => response.text())
          .then(data => document.getElementById("header-container").innerHTML = data);


        fetch("../footer.html")
          .then(response => response.text())
          .then(data => document.getElementById("footer-container").innerHTML = data);

// ------------------ Opacidade BTT  -----------------------------
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