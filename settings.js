document.addEventListener("DOMContentLoaded", function () {
  const settingsPanel = document.querySelector(".settings");
  const settingsButton = document.getElementById("open-settings");
  const closeButton = document.querySelector(".close-settings");
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  const body = document.body;

  // Update settings theme based on body theme attribute
  function updateSettingsTheme() {
    const currentTheme = body.getAttribute("data-bs-theme");
    settingsPanel.style.backgroundColor =
      currentTheme === "dark" ? "#212529ff" : "white";
    settingsPanel.style.color = currentTheme === "dark" ? "white" : "black";
  }

  // Apply theme on load
  updateSettingsTheme();

  // Open the settings panel
  settingsButton.addEventListener("click", function () {
    settingsPanel.classList.add("open");
    const clickSound = new Audio("click.mp3");
    clickSound.play().catch(() => {
      console.warn("Audio file failed to play. Using Web Audio API instead.");
      playTypingClick();
    });
  });

  // Close the settings panel
  closeButton.addEventListener("click", function () {
    settingsPanel.classList.remove("open");
    const clickSound = new Audio("click.mp3");
    clickSound.play().catch(() => {
      console.warn("Audio file failed to play. Using Web Audio API instead.");
      playTypingClick();
    });
  });

  // Close the settings panel when clicking outside the panel or button
  document.addEventListener("click", function (event) {
    if (
      !settingsPanel.contains(event.target) &&
      !settingsButton.contains(event.target)
    ) {
      settingsPanel.classList.remove("open");
    }
  });

  // Toggle dark mode when checkbox is changed
  darkModeSwitch.addEventListener("change", () => {
    const theme = darkModeSwitch.checked ? "dark" : "light";
    body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    updateSettingsTheme();
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
