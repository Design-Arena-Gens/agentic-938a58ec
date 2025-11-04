const overlay = document.getElementById("overlay");
const playButton = document.getElementById("playButton");
const bgMusic = document.getElementById("bgMusic");
const experienceDuration = 28000;
let replayTimeout;

bgMusic.volume = 0.65;

function enableAnimations() {
  document.body.classList.remove("ready");
  // force reflow so animations restart each time
  void document.body.offsetWidth;
  document.body.classList.add("ready");
}

async function startExperience() {
  clearTimeout(replayTimeout);
  enableAnimations();
  bgMusic.currentTime = 0;
  try {
    await bgMusic.play();
  } catch (error) {
    console.warn("Autoplay blocked:", error);
  }
  overlay.classList.add("hidden");
  replayTimeout = setTimeout(() => {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    overlay.classList.remove("hidden");
    playButton.textContent = "Replay with Sound";
  }, experienceDuration + 500);
}

playButton.addEventListener("click", startExperience);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    bgMusic.pause();
  } else if (document.body.classList.contains("ready") && !overlay.classList.contains("hidden")) {
    bgMusic.currentTime = 0;
  }
});
