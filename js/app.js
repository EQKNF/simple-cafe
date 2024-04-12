const toggleSidebar = () => {
  const sidebar = document.querySelector(".sidebar-container");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");
  const isActive = sidebar.classList.toggle("sidebar-toggle-active");
  line1.classList.toggle("toggle-line1", isActive);
  line2.classList.toggle("toggle-line2", isActive);
  line3.classList.toggle("toggle-line3", isActive);
  if (isActive) {
    document.addEventListener("click", closeSidebar);
  } else {
    document.removeEventListener("click", closeSidebar);
  }
};

const closeSidebar = (event) => {
  const sidebar = document.querySelector(".sidebar-container");
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");
  if (!sidebar.contains(event.target)) {
    sidebar.classList.remove("sidebar-toggle-active");
    line1.classList.remove("toggle-line1");
    line2.classList.remove("toggle-line2");
    line3.classList.remove("toggle-line3");
    document.removeEventListener("click", closeSidebar);
  }
};

const navTabs = () => {
  const buttons = document.querySelectorAll(
    ".sidebar-tab-categories-links button"
  );

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const tabs = document.querySelectorAll(".sidebar-main-tabs > div");
      tabs.forEach((tab, tabIndex) => {
        tab.style.display = index === tabIndex ? "block" : "none";
      });

      buttons.forEach((btn) => {
        btn.style.color = btn === button ? "var(--black)" : "var(--white)";
      });
    });
  });
};

const app = () => {
  document.querySelector(".sidebar-btn").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSidebar();
  });
  navTabs();
};

app();
