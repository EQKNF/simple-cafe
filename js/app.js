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

const carouselSlider = () => {
  const imgSlides = document.querySelectorAll(".carousel-slide img");
  let currentSlide = 0;
  const maxSlides = imgSlides.length;
  let slideInterval;

  const showSlide = (slideIndex) => {
    imgSlides.forEach((slide, index) => {
      if (index === slideIndex) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % maxSlides;
    showSlide(currentSlide);
    restartSlideInterval();
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + maxSlides) % maxSlides;
    showSlide(currentSlide);
    restartSlideInterval();
  };

  const initializeCarousel = () => {
    showSlide(currentSlide);
    document
      .getElementById("carousel-next-btn")
      .addEventListener("click", () => {
        nextSlide();
      });
    document
      .getElementById("carousel-pre-btn")
      .addEventListener("click", () => {
        prevSlide();
      });
    startSlideInterval();
  };

  const startSlideInterval = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const restartSlideInterval = () => {
    clearInterval(slideInterval);
    startSlideInterval();
  };

  initializeCarousel();
};

const toTheTopBtnShow = () => {
  const toTheTopBtn = document.getElementById("to-the-top-btn");

  window.addEventListener("scroll", () => {
    const shouldShow = window.scrollY > window.innerHeight * 0.5;
    toTheTopBtn.classList.toggle("show", shouldShow);
  });
};

const app = () => {
  document.querySelector(".sidebar-btn").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSidebar();
  });
  navTabs();
  toTheTopBtnShow();
  carouselSlider();
};

app();
