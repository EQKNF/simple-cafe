productDataUpdate = () => {
  const listProductsHTML = document.querySelector(".product-list");
  const listCartHTML = document.querySelector(".cart-list");
  let iconCartSpan = document.querySelector(".icon-cart .number-cart");
  let products = [];
  let cart = [];

  const addDataToHTML = () => {
    listProductsHTML.innerHTML = "";
    if (products.length > 0) {
      products.forEach((product) => {
        let newProduct = document.createElement("div");
        newProduct.classList.add("item");
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
            <img src="${product.img}" alt="" width="250" height="500" />
            <h3>${product.name}</h3>
            <div class="item-price">$${product.price}</div>
            <button class="add-to-cart">Add To Cart</button>
        `;
        listProductsHTML.appendChild(newProduct);
      });
    }
  };

  listProductsHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("add-to-cart")) {
      let id_product = positionClick.parentElement.dataset.id;
      addToCart(id_product);
    }
  });

  const addToCart = (productId) => {
    let positionThisProductInCart = cart.findIndex(
      (value) => value.productId == productId
    );
    if (cart.length <= 0) {
      cart = [
        {
          productId: productId,
          quantity: 1,
        },
      ];
    } else if (positionThisProductInCart < 0) {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    } else {
      cart[positionThisProductInCart].quantity =
        cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
  };
  const addCartToMemory = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        totalQuantity = totalQuantity + item.quantity;
        let newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.dataset.id = item.productId;

        let positionProduct = products.findIndex(
          (value) => value.id == item.productId
        );
        let info = products[positionProduct];
        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
                  <div class="item">
                    <div class="image">
                      <img src="${info.img}" />
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                      <span class="minus">-</span>
                      <span>${item.quantity}</span>
                      <span class="plus">+</span>
                  </div>
              `;
      });
    }
    iconCartSpan.innerText = totalQuantity;
  };

  listCartHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (
      positionClick.classList.contains("minus") ||
      positionClick.classList.contains("plus")
    ) {
      let productId =
        positionClick.parentElement.parentElement.parentElement.dataset.id;
      let type = "minus";
      if (positionClick.classList.contains("plus")) {
        type = "plus";
      }
      changeQuantityCart(productId, type);
    }
  });

  const changeQuantityCart = (productId, type) => {
    let positionItemInCart = cart.findIndex(
      (value) => value.productId == productId
    );
    if (positionItemInCart >= 0) {
      switch (type) {
        case "plus":
          cart[positionItemInCart].quantity =
            cart[positionItemInCart].quantity + 1;
          break;

        default:
          let changeQuantity = cart[positionItemInCart].quantity - 1;
          if (changeQuantity > 0) {
            cart[positionItemInCart].quantity = changeQuantity;
          } else {
            cart.splice(positionItemInCart, 1);
          }
          break;
      }
    }
    addCartToHTML();
    addCartToMemory();
  };

  const fetchProducts = () => {
    fetch("js/products.json")
      .then((response) => response.json())
      .then((data) => {
        products = data;
        addDataToHTML();

        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
          addCartToHTML();
        }
      });
  };

  fetchProducts();
};

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

const cartTabSlider = () => {
  const shoppingCartBtn = document.querySelector(".icon-cart");
  const closeShoppingCartBtn = document.getElementById("close");
  const cartTab = document.querySelector(".cart-tab-content");

  shoppingCartBtn.addEventListener("click", () => {
    cartTab.classList.add("cart-tab-active");
  });

  closeShoppingCartBtn.addEventListener("click", () => {
    cartTab.classList.remove("cart-tab-active");
  });
};

const app = () => {
  document.querySelector(".sidebar-btn").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSidebar();
  });
  productDataUpdate();
  navTabs();
  toTheTopBtnShow();
  carouselSlider();
  cartTabSlider();
};

app();
