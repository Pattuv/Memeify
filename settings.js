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
  });

  // Close the settings panel
  closeButton.addEventListener("click", function () {
    settingsPanel.classList.remove("open");
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
