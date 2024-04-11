const navSlide = () => {
  const sidebarBtn = document.querySelector(".sidebar-btn");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");
  const sidebar = document.querySelector(".sidebar-container");

  sidebarBtn.addEventListener("click", () => {
    line1.classList.toggle("toggle-line1");
    line2.classList.toggle("toggle-line2");
    line3.classList.toggle("toggle-line3");

    sidebar.classList.toggle("sidebar-toggle-active");
  });
};

const app = () => {
  navSlide();
};

app();
