const navSlide = () => {
  const sidebarBtn = document.querySelector(".sidebar-btn"); // Use querySelector for single elements
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");

  sidebarBtn.addEventListener("click", () => {
    nav.classList.toggle("sidebar-activate");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    line1.classList.toggle("toggle-line1");
    line2.classList.toggle("toggle-line2");
    line3.classList.toggle("toggle-line3");
  });
};

const app = () => {
  navSlide();
};

app();
