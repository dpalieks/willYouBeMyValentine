const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const flowersMessage = document.getElementById("flowersMessage");
const flowersImage = document.querySelector(".flowers-image");
const container = document.querySelector(".container");
const buttonsWrapper = document.querySelector(".buttons");
const titleEl = document.querySelector(".title");
const exitBtn = document.querySelector(".exit-btn");

let noClickCount = 0;
const maxNormalNoClicks = 5;
let yesPressed = false;

const imagePaths = ["Img1.jpeg", "Img2.jpeg", "Img3.jpeg"];
let currentImageIndex = 0;

function showFlowers() {
  flowersMessage.classList.remove("hidden");
  yesPressed = true;
  launchBalloons();

  if (buttonsWrapper) {
    buttonsWrapper.style.display = "none";
  }

  if (titleEl) {
    titleEl.textContent = "Awww thanks ❤️";
  }
}

yesBtn.addEventListener("click", showFlowers);

if (exitBtn) {
  exitBtn.addEventListener("click", () => {
    if (yesPressed) {
      window.location.reload();
    }
  });
}

noBtn.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount <= maxNormalNoClicks) {
    // Gradually shrink the button on the first 5 clicks (each time smaller)
    const scale = Math.max(0.5, 1 - noClickCount * 0.08);
    noBtn.style.transform = `scale(${scale})`;
  }

  if (noClickCount === maxNormalNoClicks + 1) {
    // After 5 successful clicks, make the button start dodging
    makeNoButtonDodge();
  }
});

function makeNoButtonDodge() {
  noBtn.style.position = "absolute";
  noBtn.classList.add("dodging");

  const dodge = () => {
    const padding = 20;

    const bounds = container
      ? container.getBoundingClientRect()
      : document.body.getBoundingClientRect();

    const rect = noBtn.getBoundingClientRect();

    const minX = bounds.left + padding;
    const maxX = bounds.right - rect.width - padding;
    const minY = bounds.top + padding;
    const maxY = bounds.bottom - rect.height - padding;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  };

  // Move immediately once, then every time the user tries to hover it
  dodge();

  noBtn.addEventListener("mouseenter", dodge);
}

function launchBalloons() {
  const balloonColors = ["#ff4b6e", "#ff8ba7", "#ffccdd", "#ffe6ee"];
  const balloonCount = 18;

  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const size = 24 + Math.random() * 20; // px
    const left = Math.random() * 100; // vw
    const duration = 5 + Math.random() * 4; // seconds
    const delay = Math.random() * 2; // seconds
    const color = balloonColors[i % balloonColors.length];

    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.3}px`;
    balloon.style.left = `${left}vw`;
    balloon.style.animationDuration = `${duration}s`;
    balloon.style.animationDelay = `${delay}s`;
    balloon.style.backgroundColor = color;

    document.body.appendChild(balloon);

    balloon.addEventListener("animationend", () => {
      balloon.remove();
    });
  }
}

if (flowersImage) {
  flowersImage.addEventListener("click", () => {
    // Move to next image in the list and update src
    currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
    flowersImage.src = imagePaths[currentImageIndex];
  });

  //Bučas
}

