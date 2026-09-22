// ================= MOBILE NAVBAR =================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  const icon = menuToggle.querySelector("i");

  if (navLinks.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});


// ================= NAVBAR SCROLL EFFECT =================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// ================= ACTIVE NAV LINK =================

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ================= ANIMATED COUNTERS =================

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;

  const statsSection = document.querySelector(".stats-section");
  const statsTop = statsSection.getBoundingClientRect().top;

  if (statsTop < window.innerHeight - 100) {
    countersStarted = true;

    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      let count = 0;

      const duration = 1800;
      const increment = target / (duration / 16);

      function updateCounter() {
        count += increment;

        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      updateCounter();
    });
  }
}

window.addEventListener("scroll", animateCounters);
animateCounters();


// ================= PORTFOLIO FILTER =================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    portfolioCards.forEach(card => {

      if (
        filter === "all" ||
        card.classList.contains(filter)
      ) {
        card.classList.remove("hide");

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 50);

      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";

        setTimeout(() => {
          card.classList.add("hide");
        }, 250);
      }

    });

  });
});


// ================= CONTACT FORM VALIDATION =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formMessage.className = "form-message";

  if (
    name === "" ||
    email === "" ||
    phone === "" ||
    service === "" ||
    message === ""
  ) {
    formMessage.textContent =
      "Please fill in all required fields.";

    formMessage.classList.add("error");

    return;
  }

  if (!emailPattern.test(email)) {
    formMessage.textContent =
      "Please enter a valid email address.";

    formMessage.classList.add("error");

    return;
  }

  if (phone.replace(/\D/g, "").length < 10) {
    formMessage.textContent =
      "Please enter a valid phone number.";

    formMessage.classList.add("error");

    return;
  }

  formMessage.textContent =
    "Thank you! Your message has been received. We will contact you soon.";

  formMessage.classList.add("success");

  contactForm.reset();

  setTimeout(() => {
    formMessage.className = "form-message";
    formMessage.textContent = "";
  }, 6000);
});


// ================= BACK TO TOP =================

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// ================= CURRENT YEAR =================

document.getElementById("year").textContent =
  new Date().getFullYear();


// ================= SMOOTH SCROLL FOR INTERNAL LINKS =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });
});