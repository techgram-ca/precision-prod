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

// Floating Offer Card
document.addEventListener("DOMContentLoaded", function () {
  const card   = document.getElementById("offer-card");
  const bubble = document.getElementById("offer-bubble");
  const closeBtn = document.getElementById("offer-close");
  const ctaBtn   = document.getElementById("offer-cta");

  if (!card || !bubble) return;

  // Show card after 5–6 seconds
  const delay = 5000 + Math.random() * 1000;
  const showTimer = setTimeout(showCard, delay);

  function showCard() {
    card.classList.add("offer-visible");
  }

  function hideCard(callback) {
    // Animate toward bottom-right corner before hiding
    const cardRect = card.getBoundingClientRect();
    const cardCx = cardRect.left + cardRect.width  / 2;
    const cardCy = cardRect.top  + cardRect.height / 2;
    const targetX = window.innerWidth  - 36; // center of bubble
    const targetY = window.innerHeight - 36;
    const dx = targetX - cardCx;
    const dy = targetY - cardCy;

    card.style.transition = "transform 0.55s ease-in, opacity 0.45s ease-in";
    card.style.transform  = "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px)) scale(0.12)";
    card.style.opacity    = "0";

    setTimeout(function () {
      card.classList.remove("offer-visible");
      // Reset inline styles so CSS class controls it again
      card.style.transition = "";
      card.style.transform  = "";
      card.style.opacity    = "";
      if (callback) callback();
    }, 520);
  }

  function showBubble() {
    bubble.style.display = "flex";
    // Force reflow so transition fires
    bubble.offsetWidth; // eslint-disable-line no-unused-expressions
    bubble.classList.add("bubble-visible");
  }

  function hideBubble(callback) {
    bubble.style.transition = "transform 0.3s ease-in, opacity 0.3s ease-in";
    bubble.style.transform  = "scale(0)";
    bubble.style.opacity    = "0";
    setTimeout(function () {
      bubble.classList.remove("bubble-visible");
      bubble.style.display    = "none";
      bubble.style.transition = "";
      bubble.style.transform  = "";
      bubble.style.opacity    = "";
      if (callback) callback();
    }, 320);
  }

  // Close button — minimize to corner bubble
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    clearTimeout(showTimer);
    hideCard(function () {
      showBubble();
    });
  });

  // Bubble click — re-expand card to center
  bubble.addEventListener("click", function () {
    hideBubble(function () {
      showCard();
    });
  });
  bubble.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") bubble.click();
  });

  // CTA button — scroll to contact form and pre-fill project details
  ctaBtn.addEventListener("click", function () {
    const contactSection = document.getElementById("contact");
    const detailsTextarea = document.querySelector('textarea[name="details"]');

    if (detailsTextarea) {
      detailsTextarea.value =
        "Hi, I'm interested in claiming the 10% discount offer for my renovation project. " +
        "Please provide me with a detailed quote at your earliest convenience. " +
        "I'd love to discuss my project requirements and get started soon!";
    }

    hideCard(function () {
      if (contactSection) {
        document.documentElement.style.scrollBehavior = "smooth";
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(function () {
          document.documentElement.style.scrollBehavior = "auto";
          if (detailsTextarea) detailsTextarea.focus();
        }, 900);
      }
    });
  });
});

// Smooth Scrolling Navigation
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');
  const mobileMenu = document.getElementById("mobile-menu");

  // Prevent default browser hash scrolling
  if (window.location.hash) {
    window.scrollTo(0, 0);
  }

  // Function to scroll to element and remove hash
  function scrollToElement(targetId, smooth = true) {
    if (!targetId) return;
    
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // Close mobile menu if it's open
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
    
    // Scroll to target
    if (smooth) {
      document.documentElement.style.scrollBehavior = 'smooth';
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      // Reset to auto after scrolling completes
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'auto';
      }, 1000);
    } else {
      window.scrollTo({ top: targetElement.offsetTop, behavior: 'instant' });
    }
    
    // Remove hash from URL
    history.replaceState(null, "", window.location.pathname);
  }

  // Handle link clicks
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const targetId = href.substring(1);
      
      e.preventDefault();
      scrollToElement(targetId, true); // Always smooth for link clicks
    });
  });
  
  // Handle direct URL access with hash
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Use instant scroll for #success, smooth for others
      const isSuccess = targetId === "success";
      scrollToElement(targetId, !isSuccess);
    }, 100);
  }
});
