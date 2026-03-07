// ====== СЕКРЕТНЫЕ ОТВЕТЫ ======
const secretWord = "гулкайыр";
const secretDrama = "потомки солнца";

// ====== ЭЛЕМЕНТЫ ======
const loader = document.getElementById("loader");

const envelopeSection = document.getElementById("envelopeSection");
const envelope = document.getElementById("envelope");

const answerInput = document.getElementById("answerInput");
const checkBtn = document.getElementById("checkBtn");
const attemptsText = document.getElementById("attemptsText");
const statusText = document.getElementById("statusText");
const hintBox = document.getElementById("hintBox");

const gameBox = document.getElementById("gameBox");
const patientStatus = document.getElementById("patientStatus");
const healthBar = document.getElementById("healthBar");

const pulseBtn = document.getElementById("pulseBtn");
const medicineBtn = document.getElementById("medicineBtn");
const stabilizeBtn = document.getElementById("stabilizeBtn");

const secretNote = document.getElementById("secretNote");
const typingText = document.getElementById("typingText");

const bgMusic = document.getElementById("bgMusic");
const musicToggleBtn = document.getElementById("musicToggleBtn");

const heartsContainer = document.getElementById("hearts");

const slides = document.getElementById("slides");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");
const slider = document.getElementById("slider");

const photo = document.querySelector(".photo-box img");

// ====== ЗАГАДКА ======
const maxAttempts = 3;
let attemptsLeft = maxAttempts;
let puzzleSolved = false;

// ====== ИГРА ======
let pulseChecked = false;
let medicineGiven = false;
let patientSaved = false;
let health = 20;

// ====== СЛАЙДЕР ======
let currentSlide = 0;
const totalSlides = dots.length;

// ====== УТИЛИТЫ ======
function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ");
}

function updateHealthBar() {
  if (healthBar) {
    healthBar.style.width = health + "%";
  }
}

// ====== ПЕЧАТАЮЩИЙСЯ ТЕКСТ ======
function typeText() {
  const text = `Поздравляю тебя с прекрасным праздником — 8 Марта!
Желаю тебе счастья, крепкого здоровья, любви и исполнения самых заветных желаний.
Пусть каждый день приносит радость, улыбки и хорошее настроение.
Пусть в твоей жизни всегда будет много тепла, заботы и красивых моментов.

Оставайся такой же прекрасной, доброй и особенной.
Пусть рядом всегда будут люди, которые ценят, берегут и искренне любят тебя.`;

  if (!typingText) return;

  typingText.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      typingText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 35);
    }
  }

  typing();
}

// ====== ЗАГАДКА ======
function solvePuzzle() {
  puzzleSolved = true;

  if (answerInput) answerInput.disabled = true;
  if (checkBtn) checkBtn.disabled = true;
  if (statusText) {
    statusText.textContent = "Правильно! Теперь спаси пациента, чтобы открыть записку 💖";
  }
  if (gameBox) {
    gameBox.classList.add("show");
  }
}

function checkAnswer() {
  if (puzzleSolved || !answerInput) return;

  const value = normalizeText(answerInput.value);

  if (!value) {
    if (statusText) {
      statusText.textContent = "Сначала введи ответ ✨";
    }
    return;
  }

  const isCorrect =
    value === normalizeText(secretWord) ||
    value === normalizeText(secretDrama);

  if (isCorrect) {
    solvePuzzle();
    return;
  }

  attemptsLeft--;

  if (attemptsText) {
    attemptsText.textContent = "Осталось попыток: " + attemptsLeft;
  }

  if (attemptsLeft > 0) {
    if (statusText) {
      statusText.textContent = "Неправильно, попробуй ещё 💌";
    }
  } else {
    if (statusText) {
      statusText.textContent = "Попытки закончились. Держи подсказку ✨";
    }
    if (hintBox) {
      hintBox.classList.add("show");
    }
    answerInput.value = "";
  }
}

// ====== МИНИ-ИГРА ======
function unlockNote() {
  if (patientStatus) {
    patientStatus.textContent = "Пациент спасён! Теперь открой письмо 💖";
  }

  if (envelopeSection) {
    envelopeSection.classList.add("show");
  } else if (secretNote) {
    secretNote.classList.add("show");
    typeText();
  }
}

function checkPulse() {
  if (patientSaved) return;

  pulseChecked = true;
  health = 45;
  updateHealthBar();

  if (patientStatus) {
    patientStatus.textContent = "Пульс найден. Теперь нужно дать лекарство.";
  }
}

function giveMedicine() {
  if (patientSaved) return;

  if (!pulseChecked) {
    if (patientStatus) {
      patientStatus.textContent = "Сначала нужно проверить пульс.";
    }
    return;
  }

  medicineGiven = true;
  health = 75;
  updateHealthBar();

  if (patientStatus) {
    patientStatus.textContent =
      "Лекарство подействовало. Осталось стабилизировать пациента.";
  }
}

function stabilizePatient() {
  if (patientSaved) return;

  if (!pulseChecked || !medicineGiven) {
    if (patientStatus) {
      patientStatus.textContent =
        "Нельзя стабилизировать пациента, пока не выполнены предыдущие шаги.";
    }
    return;
  }

  patientSaved = true;
  health = 100;
  updateHealthBar();
  unlockNote();
}

// ====== КОНВЕРТ ======
if (envelope) {
  envelope.addEventListener("click", function () {
    envelope.classList.add("open");

    setTimeout(() => {
      if (secretNote) {
        secretNote.classList.add("show");
        typeText();
      }

      if (envelopeSection) {
        envelopeSection.style.display = "none";
      }
    }, 700);
  });
}

// ====== МУЗЫКА ======
if (musicToggleBtn && bgMusic) {
  musicToggleBtn.addEventListener("click", async function () {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
        musicToggleBtn.textContent = "⏸ Пауза";
      } else {
        bgMusic.pause();
        musicToggleBtn.textContent = "▶ Включить музыку";
      }
    } catch (error) {
      console.log("Ошибка музыки:", error);
    }
  });
}

// ====== СЕРДЕЧКИ ======
function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "🤍";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 5 + "s";
  heart.style.fontSize = 12 + Math.random() * 20 + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

// ====== ЛЕПЕСТКИ ======
function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.innerHTML = "🌸";

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 5 + Math.random() * 5 + "s";
  petal.style.fontSize = 14 + Math.random() * 18 + "px";

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 10000);
}

// ====== СЛАЙДЕР ======
function updateSlider() {
  if (!slides || dots.length === 0) return;

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  if (totalSlides === 0) return;
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  if (totalSlides === 0) return;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

if (nextBtn && prevBtn && slides && dots.length > 0) {
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      currentSlide = Number(this.dataset.index);
      updateSlider();
    });
  });
}

// ====== СВАЙП НА ТЕЛЕФОНЕ ======
let startX = 0;
let endX = 0;

if (slider) {
  slider.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", function (e) {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", function () {
    const diff = startX - endX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }

    startX = 0;
    endX = 0;
  });
}

// ====== УВЕЛИЧЕНИЕ ФОТО ======
if (photo) {
  photo.addEventListener("click", function () {
    this.classList.toggle("fullscreen");
  });
}

// ====== СОБЫТИЯ ======
if (checkBtn) {
  checkBtn.addEventListener("click", checkAnswer);
}

if (answerInput) {
  answerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });
}

if (pulseBtn) {
  pulseBtn.addEventListener("click", checkPulse);
}

if (medicineBtn) {
  medicineBtn.addEventListener("click", giveMedicine);
}

if (stabilizeBtn) {
  stabilizeBtn.addEventListener("click", stabilizePatient);
}

// ====== ЗАПУСК ======
setInterval(createHeart, 320);
setInterval(createPetal, 700);
updateHealthBar();
updateSlider();

// ====== LOADER ======
window.addEventListener("load", function () {
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "0.6s";

      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }, 1200);
  }
});
const surpriseBtn = document.getElementById("surpriseBtn");

function heartFirework(){

for(let i=0;i<25;i++){

const heart = document.createElement("div");
heart.innerHTML = "💖";
heart.style.position="fixed";
heart.style.left = Math.random()*100+"vw";
heart.style.top = "60vh";
heart.style.fontSize = 20+Math.random()*25+"px";
heart.style.zIndex="9999";
heart.style.pointerEvents="none";
heart.style.transition="1.2s";

document.body.appendChild(heart);

setTimeout(()=>{
heart.style.transform =
`translate(${(Math.random()-0.5)*400}px,${-Math.random()*400}px)`;
heart.style.opacity="0";
},10);

setTimeout(()=>{
heart.remove();
},1200);

}

}

if(surpriseBtn){
surpriseBtn.addEventListener("click",heartFirework);
}
const themeToggle = document.getElementById("themeToggle");

if(themeToggle){

themeToggle.addEventListener("click",function(){

document.body.classList.toggle("night");

if(document.body.classList.contains("night")){
themeToggle.textContent="☀️ День";
}else{
themeToggle.textContent="🌙 Ночь";
}

});

}
window.addEventListener("load", function () {
  const introScreen = document.getElementById("intro-screen");
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.display = "none";
  }

  if (introScreen) {
    setTimeout(() => {
      introScreen.classList.add("hide");
    }, 2200);
  }
});