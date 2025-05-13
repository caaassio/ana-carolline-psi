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
