const closeSidebar = () => {
  const sidebar = document.querySelector(".sidebar-container");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");
  if (sidebar.classList.contains("sidebar-toggle-active")) {
    sidebar.classList.remove("sidebar-toggle-active");
    line1.classList.toggle("toggle-line1");
    line2.classList.toggle("toggle-line2");
    line3.classList.toggle("toggle-line3");
    document.removeEventListener("click", closeSidebar);
  }
};

const navSlide = () => {
  const sidebarBtn = document.querySelector(".sidebar-btn");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");
  const sidebar = document.querySelector(".sidebar-container");

  sidebarBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    line1.classList.toggle("toggle-line1");
    line2.classList.toggle("toggle-line2");
    line3.classList.toggle("toggle-line3");
    sidebar.classList.toggle("sidebar-toggle-active");

    if (sidebar.classList.contains("sidebar-toggle-active")) {
      document.addEventListener("click", closeSidebar);
    } else {
      document.removeEventListener("click", closeSidebar);
    }
  });

  sidebar.addEventListener("click", (event) => {
    event.stopPropagation();
  });
};

const navTabs = () => {
  const tabs = document.querySelectorAll(".sidebar-main-tabs > div");
  const buttons = document.querySelectorAll(
    ".sidebar-tab-categories-links button"
  );

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      tabs.forEach((tab, tabIndex) => {
        tab.style.display = index === tabIndex ? "block" : "none";
      });

      buttons.forEach((btn, btnIndex) => {
        if (index === btnIndex) {
          btn.style.color = "var(--black)";
        } else {
          btn.style.color = "var(--white)";
        }
      });
    });
  });
};

const app = () => {
  navSlide();
  navTabs();
};

app();
