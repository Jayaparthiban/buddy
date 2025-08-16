document.addEventListener("DOMContentLoaded", function () {
  const navigation = document.getElementById("primary-navigation");
  const navToggle = document.querySelector(".nav-toggle");
  const yearSpan = document.getElementById("year");
  const form = document.getElementById("contact-form");
  const successEl = document.getElementById("form-success");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  if (navToggle && navigation) {
    navToggle.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a[href^='#']").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("show");
    });
  }

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function setError(el, message) {
    el.textContent = message;
  }

  function clearError(el) {
    el.textContent = "";
  }

  function validateForm() {
    let isValid = true;

    if (!nameInput.value.trim()) {
      setError(nameError, "Please enter your name.");
      isValid = false;
    } else {
      clearError(nameError);
    }

    if (!emailInput.value.trim()) {
      setError(emailError, "Please enter your email.");
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(emailError, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailError);
    }

    if (!messageInput.value.trim()) {
      setError(messageError, "Please enter a message.");
      isValid = false;
    } else {
      clearError(messageError);
    }

    return isValid;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm()) {
        successEl.hidden = true;
        return;
      }
      setTimeout(function () {
        successEl.hidden = false;
        form.reset();
      }, 400);
    });
  }
});