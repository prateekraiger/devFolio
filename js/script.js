"use strict";

// Light/Dark Theme Toggle
const $themeBtn = document.querySelector("[data-theme-btn]");
const $HTML = document.documentElement;
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Set theme based on session storage or system preference
if (sessionStorage.getItem("theme")) {
  $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
  $HTML.dataset.theme = isDark ? "dark" : "light";
}

// Function to change theme
const changeTheme = () => {
  $HTML.dataset.theme =
    sessionStorage.getItem("theme") === "light" ? "dark" : "light";
  sessionStorage.setItem("theme", $HTML.dataset.theme);
};

$themeBtn.addEventListener("click", changeTheme);

// Tabs Functionality
const $tabBtns = document.querySelectorAll("[data-tab-btn]");
let lastActiveTab = document.querySelector("[data-tab-content].active");
let lastActiveTabbtn = null;

$tabBtns.forEach((item) => {
  item.addEventListener("click", function () {
    if (lastActiveTab) {
      lastActiveTab.classList.remove("active");
    }
    if (lastActiveTabbtn) {
      lastActiveTabbtn.classList.remove("active");
    }

    // Handle keyboard accessibility
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        item.click();
      }
    });

    const tabContent = document.querySelector(
      `[data-tab-content="${item.dataset.tabBtn}"]`
    );
    if (tabContent) {
      tabContent.classList.add("active");
    }
    this.classList.add("active");

    lastActiveTab = tabContent;
    lastActiveTabbtn = this;
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form Submission Validation
const form = document.querySelector(".input-wrapper");
form.addEventListener("submit", (e) => {
  const inputs = form.querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value) {
      valid = false;
      input.classList.add("error"); // Add error class for styling
    } else {
      input.classList.remove("error");
    }
  });

  if (!valid) {
    e.preventDefault(); // Prevent form submission
    alert("Please fill out all fields");
  }
});
