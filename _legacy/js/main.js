const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks?.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navLinks?.classList.remove("open");
  });
});

const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  // Placeholder: wire this to Formspree, Zapier webhook, or your backend later
  console.log("Contact submission:", { name, email, message });

  formStatus.textContent = "Thanks! Your message was received. I'll be in touch soon.";
  formStatus.className = "form-note success";
  form.reset();

  setTimeout(() => {
    formStatus.textContent = "";
    formStatus.className = "form-note";
  }, 5000);
});

const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  if (current > 80) {
    header?.style.setProperty("box-shadow", "0 4px 24px rgba(0,0,0,0.3)");
  } else {
    header?.style.removeProperty("box-shadow");
  }
  lastScroll = current;
});
