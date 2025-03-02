document.addEventListener("DOMContentLoaded", function () {
  const settingsPanel = document.querySelector(".settings");
  const settingsButton = document.getElementById("open-settings");
  const closeButton = document.querySelector(".close-settings");
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  const body = document.body;

  function updateSettingsTheme() {
    const currentTheme = body.getAttribute("data-bs-theme");
    settingsPanel.style.backgroundColor =
      currentTheme === "dark" ? "#222" : "#f8f9fa";
    settingsPanel.style.color = currentTheme === "dark" ? "white" : "black";
  }

  updateSettingsTheme();

  settingsButton.addEventListener("click", function () {
    settingsPanel.classList.add("open");
  });

  closeButton.addEventListener("click", function () {
    settingsPanel.classList.remove("open");
  });

  document.addEventListener("click", function (event) {
    if (
      !settingsPanel.contains(event.target) &&
      !settingsButton.contains(event.target)
    ) {
      settingsPanel.classList.remove("open");
    }
  });

  darkModeSwitch.addEventListener("change", () => {
    const theme = darkModeSwitch.checked ? "dark" : "light";
    body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    updateSettingsTheme();
  });
});
