// Create balloons with floating animation
const balloonsContainer = document.querySelector('.balloons-container');
const balloonCount = 6;
for(let i = 0; i < balloonCount; i++) {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloonsContainer.appendChild(balloon);
}

// Confetti dots
const confettiCount = 50;
for(let i = 0; i < confettiCount; i++) {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.animationDuration = `${5 + Math.random() * 7}s`;
  confetti.style.animationDelay = `${Math.random() * 10}s`;
  document.body.appendChild(confetti);
}

// Countdown Timer setup
const countdownDate = new Date("September 30, 2025 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    document.getElementById("countdown").textContent = "Happy Birthday!";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000*60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Quiz data and logic
const quizData = [
  {
    question: "Why did the skeleton not go to the birthday party?",
    options: ["He had no body to go with", "He was too busy", "He was scared", "He was ill"],
    answerIndex: 0
  },
  {
    question: "What do you get when you cross a snowman with a birthday cake?",
    options: ["Frosting", "A cool celebration", "Snow cake", "Freezing cake"],
    answerIndex: 0
  },
  {
    question: "Why are birthdays good for you?",
    options: ["They add years to your life", "You get gifts", "You eat cake", "They make you smile"],
    answerIndex: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  nextBtn.disabled = true;
  scoreEl.textContent = "";
  const current = quizData[currentQuestionIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectOption(index));
    optionsEl.appendChild(btn);
  });
}

function selectOption(selectedIndex) {
  const current = quizData[currentQuestionIndex];
  if (selectedIndex === current.answerIndex) {
    score++;
  }
  Array.from(optionsEl.children).forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === current.answerIndex) {
      btn.classList.add("correct");
    } else if (idx === selectedIndex) {
      btn.classList.add("wrong");
    }
  });
  nextBtn.disabled = false;
  scoreEl.textContent = `Score: ${score} / ${quizData.length}`;
}

function loadNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= quizData.length) {
    questionEl.textContent = "Quiz Completed! Final Score: " + score + "/" + quizData.length;
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;
    return;
  }
  loadQuestion();
}

loadQuestion();

// Check if element in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

const photosSection = document.getElementById('photosSection');
const photoGallery = document.getElementById('photoGallery');
const videosSection = document.getElementById('videosSection');
const wishVideo1 = document.getElementById('wishVideo1');

// Photo gallery fades in on scroll
function checkPhotoGallery() {
  if (isInViewport(photosSection) && !photoGallery.classList.contains('visible')) {
    photoGallery.classList.add('visible');
  }
}

// Fullscreen and autoplay video on scroll
async function checkVideos() {
  if (isInViewport(videosSection) && !wishVideo1.classList.contains('fullscreened')) {
    wishVideo1.classList.add('fullscreened');
    try {
      if (wishVideo1.requestFullscreen) await wishVideo1.requestFullscreen();
      else if (wishVideo1.webkitRequestFullscreen) await wishVideo1.webkitRequestFullscreen();
      else if (wishVideo1.mozRequestFullScreen) await wishVideo1.mozRequestFullScreen();
      else if (wishVideo1.msRequestFullscreen) await wishVideo1.msRequestFullscreen();
    } catch (e) {
      console.log('Fullscreen not supported/rejected');
    }
    wishVideo1.play();
  }
}

// Lightbox for photo gallery
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-img');
const closeLightbox = document.querySelector('.lightbox .close');

document.querySelectorAll('.photo-gallery img').forEach(img => {
  img.addEventListener('click', (e) => {
    lightbox.style.display = 'flex';
    lightboxImage.src = e.target.src;
    lightboxImage.alt = e.target.alt;
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});

// Personalized greeting modal logic
const greetBtn = document.getElementById('greetBtn');
const greetModal = document.getElementById('greetModal');
const closeModal = document.querySelector('.close-modal');

greetBtn.addEventListener('click', () => {
  greetModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  greetModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === greetModal) {
    greetModal.style.display = 'none';
  }
});

// Hide playlist visually but autoplay one song seamlessly
const partyPlaylist = document.getElementById('partyPlaylist');
const partySong = document.getElementById('partySong');
partyPlaylist.style.display = 'none';
window.addEventListener('load', () => {
  partySong.play().catch(() => {});
});

// Scroll event listener
window.addEventListener('scroll', () => {
  checkPhotoGallery();
  checkVideos();
});

document.querySelector('.letter__border .close').addEventListener('click', () => {
  document.querySelector('.box__letter').style.display = 'none';
});


// Disable hover effects logic on touch devices (optional guard)
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouch) {
  document.body.classList.add('touch-device');
}

// Ensure close works
const closeBtn = document.querySelector('.fa-xmark, .letter__border .close');
const modal   = document.querySelector('.boxMail') || document.querySelector('.box__letter');
if (closeBtn && modal) {
  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
}

// Prevent invisible overlay blocking taps
const overlays = document.querySelectorAll('.boxMail, .box__letter');
overlays.forEach(el => {
  el.style.pointerEvents = 'auto';
});

