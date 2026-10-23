// Anima os elementos conforme aparecem na tela.
const elementosAnimados = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  elementosAnimados.forEach((elemento) => observador.observe(elemento));
} else {
  elementosAnimados.forEach((elemento) => elemento.classList.add("visible"));
}

// Botão de coração: cria pequenos corações flutuando pela tela.
const heartButton = document.getElementById("heartButton");

heartButton.addEventListener("click", () => {
  const simbolos = ["♡", "♥", "✧"];
  for (let i = 0; i < 7; i++) {
    const coracao = document.createElement("span");
    coracao.className = "heart-float";
    coracao.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    coracao.style.left = `${18 + Math.random() * 64}%`;
    coracao.style.top = `${58 + Math.random() * 24}%`;
    coracao.style.animationDelay = `${Math.random() * 0.35}s`;
    document.body.appendChild(coracao);
    coracao.addEventListener("animationend", () => coracao.remove());
  }
});

// Galeria ampliada (lightbox).
const fotos = [
  { src: "fotos/casal-1.jpeg", legenda: "Um dia especial ♡" },
  { src: "fotos/casal-2.jpeg", legenda: "Do jeitinho de vocês ♡" }
];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeButton = document.getElementById("lightboxClose");
let fotoAtual = 0;

function abrirFoto(indice) {
  fotoAtual = (indice + fotos.length) % fotos.length;
  lightboxImage.src = fotos[fotoAtual].src;
  lightboxCaption.textContent = fotos[fotoAtual].legenda;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function fecharFoto() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-card").forEach((cartao, indice) => {
  cartao.addEventListener("click", () => abrirFoto(indice));
});

closeButton.addEventListener("click", fecharFoto);
document.getElementById("lightboxPrev").addEventListener("click", () => abrirFoto(fotoAtual - 1));
document.getElementById("lightboxNext").addEventListener("click", () => abrirFoto(fotoAtual + 1));

lightbox.addEventListener("click", (evento) => {
  if (evento.target === lightbox) fecharFoto();
});

document.addEventListener("keydown", (evento) => {
  if (!lightbox.classList.contains("open")) return;
  if (evento.key === "Escape") fecharFoto();
  if (evento.key === "ArrowLeft") abrirFoto(fotoAtual - 1);
  if (evento.key === "ArrowRight") abrirFoto(fotoAtual + 1);
});
