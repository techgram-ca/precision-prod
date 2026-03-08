// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }
});

// Project Type Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("project-type-button");
  const dropdown = document.getElementById("project-type-dropdown");
  const text = document.getElementById("project-type-text");
  const hiddenInput = document.getElementById("project-type-value");
  const options = dropdown ? dropdown.querySelectorAll("[data-value]") : [];
  const form = document.querySelector('form[action*="formsubmit.co"]');
  
  if (!button) return;
  
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });
  
  options.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const value = this.getAttribute("data-value");
      text.textContent = this.textContent;
      hiddenInput.value = value;
      button.classList.remove("border-red-500");
      dropdown.classList.add("hidden");
    });
  });
  
  document.addEventListener("click", function (e) {
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
  
  // Form validation - intercept submit on capture phase
  if (form) {
    form.addEventListener("submit", function (e) {
      if (!hiddenInput.value || hiddenInput.value === "") {
        e.preventDefault();
        e.stopPropagation();
        button.classList.add("border-red-500");
        dropdown.classList.remove("hidden");
        return false;
      }
    }, true);
  }
});

// Smooth Scrolling Navigation
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');
  const mobileMenu = document.getElementById("mobile-menu");

  // Function to scroll to element and remove hash
  function scrollToElement(targetId) {
    if (!targetId) return;
    
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // Close mobile menu if it's open
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
    
    // Scroll to target
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    
    // Remove hash from URL
    history.replaceState(null, "", window.location.pathname);
  }

  // Handle link clicks
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const targetId = href.substring(1);
      
      e.preventDefault();
      scrollToElement(targetId);
    });
  });
  
  // Handle direct URL access with hash
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      scrollToElement(targetId);
    }, 100);
  }
});
