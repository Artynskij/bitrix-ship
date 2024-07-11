document.addEventListener("DOMContentLoaded", () => {
  burgerLogic();
  headerDropdownLogic();
  // headerResize();
  switchLogic();
  switcherLogic();
  // sliderLogic();
  dropdownLogic();
  mainBannerLogic();
  moreProductLogic();
  modalLogic();
});
const body = document.querySelector("body");
// burger ----------------------------------------------------------------------------------------
function burgerLogic() {
  const burger = document?.querySelector("[data-burger]");
  const nav = document?.querySelector("[data-nav]");
  const navItems = nav?.querySelectorAll("a");
  const body = document.body;
  const header = document?.querySelector(".header");
  const headerHeight = header.offsetHeight;
  document
    .querySelector(":root")
    .style.setProperty("--header-height", `${headerHeight}px`);

  burger?.addEventListener("click", () => {
    body.classList.toggle("stop-scroll");
    burger?.classList.toggle("burger--active");
    nav?.classList.toggle("nav--visible");
  });

  navItems.forEach((el) => {
    el.addEventListener("click", () => {
      body.classList.remove("stop-scroll");
      burger?.classList.remove("burger--active");
      nav?.classList.remove("nav--visible");
    });
  });
}
// headerResize ----------------------------------------------------------------------------------------
function headerResize() {
  const headerBlock = document.querySelector(".header");
  document.addEventListener("scroll", () => {
    if (window.scrollY > 25) {
      headerBlock.classList.add("scroll");
    } else {
      headerBlock.classList.remove("scroll");
    }
  });
}
// headerDropdownLogic
function headerDropdownLogic() {
  if (window.innerWidth > 1300) return;
  const header = document.querySelector("header");
  const btnNavItems = header.querySelectorAll(".nav-item");

  btnNavItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      // const navItemDrop = navItem.querySelector(".nav-item__dropdown");
      navItem.classList.toggle("active");
      // navItemDrop.classList.toggle("active");
    });
  });
}
// switch ----------------------------------------------------------------------------------------
function switchLogic() {
  const switchNodes = document.querySelectorAll(".switcher");

  switchNodes.forEach((switchN) => {
    const switchItems = switchN.querySelectorAll(".switcher-title__item");
    let prevNode = switchItems[0];
    switchItems.forEach((itemNode, index) => {
      if (index === 0) itemNode.classList.add("active");

      itemNode.addEventListener("click", () => {
        prevNode.classList.remove("active");
        itemNode.classList.add("active");
        prevNode = itemNode;
      });
    });
  });
}
// switcher ----------------------------------------------------------------------------------------
function switcherLogic() {
  const switchBlock = document.querySelector(".switcher-product");
  if (!switchBlock) return;
  const titleItems = switchBlock.querySelectorAll(".switcher-title__item");
  const contentItems = switchBlock.querySelectorAll(".switcher-content__item");
  titleItems.forEach((item) =>
    item.addEventListener("click", () => {
      toggleProgressContent();
    })
  );
  toggleProgressContent();
  function toggleProgressContent() {
    titleItems.forEach((dotNode) => {
      if (dotNode.className.includes("active")) {
        contentItems.forEach((contentNode) => {
          contentNode.classList.remove("active");
          if (
            contentNode.attributes["data-value"].value ===
            dotNode.attributes["data-key"].value
          ) {
            contentNode.classList.add("active");
          }
        });
      }
    });
  }
}
// sliderLogic
function sliderLogic() {
  const swiperOne = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    // loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    // centeredSlides: true,
    grabCursor: true,
    // If we need pagination
    navigation: {
      nextEl: ".swiperMY-button-next",
      prevEl: ".swiperMY-button-prev",
    },

    breakpoints: {
      // when window width is >= 320px
      840: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

// dropdownLogic
function dropdownLogic() {
  const dropdownButtons = document.querySelectorAll(".dropdown-button");
  const dropdownBlocks = document.querySelectorAll(".dropdown-content");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dropdownBlocks.forEach((block) => {
        if (
          button.getAttribute("data-title") ===
          block.getAttribute("data-content")
        ) {
          block.classList.toggle("active");
        }
      });
    });
  });
}
// logicMainBanner
function mainBannerLogic() {
  const imgFrame1 = document.querySelector(".banner-frame1");
  const imgFrame2 = document.querySelector(".banner-frame2");
  const imgFrame3 = document.querySelector(".banner-frame3");
  const imgFrame4 = document.querySelector(".banner-frame4");
  if (!imgFrame1) return;
  let numImg = 1;
  setInterval(() => {
    numImg = numImg === 5 ? 1 : numImg + 1;
    imgFrame1.src = `./asset/img/main banner/main-baner-1-${numImg}.svg`;
    imgFrame2.src = `./asset/img/main banner/main-baner-2-${numImg}.svg`;
    imgFrame3.src = `./asset/img/main banner/main-baner-3-${numImg}.svg`;
    imgFrame4.src = `./asset/img/main banner/main-baner-4-${numImg}.svg`;
  }, 1000);
}
function moreProductLogic() {
  const productSecondBlock = document.querySelector(
    ".product__content--second"
  );
  if (!productSecondBlock) return;
  const btnClick = document.querySelector(".product__btn--more");
  btnClick.addEventListener("click", () => {
    if (productSecondBlock.className.includes("active")) {
      productSecondBlock.classList.remove("active");
      btnClick.innerHTML = "Показать все продукты";
    } else {
      productSecondBlock.classList.add("active");
      btnClick.innerHTML = "Скрыть все продукты";
    }
  });
}
// modalLogic
function modalLogic() {
  const modalBlock = document.querySelector(".modal-block");
  if (!modalBlock) return;
  const btns = document.querySelectorAll(".open-modal");
  const modalOverlay = modalBlock.querySelector(".modal-overlay ");
  const modals = modalBlock.querySelectorAll(".modal");
  const modalContent = modalBlock.querySelector(".modal-content");
  const btnsClose = modalBlock.querySelector(".modal-close");
  btns.forEach((el) => {
    el.addEventListener("click", (e) => {
      let path = e.currentTarget.getAttribute("data-path");
      modals.forEach((el) => {
        el.classList.remove("modal--visible");
      });
      body.style.overflow = "hidden";
      body.style.paddingRight = "10px";

      if (path === "cert") {
        modalContent.innerHTML = el.outerHTML;
      }
      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add("modal--visible");

      modalOverlay.classList.add("modal-overlay--visible");
    });
  });

  btnsClose.addEventListener("click", () => {
    modalOverlay.classList.remove("modal-overlay--visible");

    // modalContent.classList.remove("certificate-block");
    body.style.overflow = "auto";
    body.style.paddingRight = "0";
    modal.classList.remove("modal--visible");

    modalContent.innerHTML = "";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target == modalOverlay) {
      body.style.overflow = "auto";
      body.style.paddingRight = "0";
      modalOverlay.classList.remove("modal-overlay--visible");
      modal.classList.remove("modal--visible");

      modalContent.innerHTML = "";
    }
  });
}
