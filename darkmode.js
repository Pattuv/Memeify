const darkModeSwitch = document.getElementById("darkModeSwitch");
const body = document.body;

// Check local storage to set the initial theme
const savedTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-bs-theme", savedTheme);
darkModeSwitch.checked = savedTheme === "dark";

// Add event listener to toggle the theme
darkModeSwitch.addEventListener("change", () => {
  const theme = darkModeSwitch.checked ? "dark" : "light";
  body.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
  const clickSound = new Audio("click_soft.mp3");
  clickSound.play().catch(() => {
    console.warn("Audio file failed to play. Using Web Audio API instead.");
    playTypingClick();
  });
});

function playTypingClick() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(450, audioCtx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.1);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}
