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
});
