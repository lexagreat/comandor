const maskOptions = {
   mask: "+{7} (000) 000-00-00",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}
const body = document.body;

document.addEventListener("DOMContentLoaded", () => {
   home();
   header();
   copypaste();
   catalog();
   tabs("[name='catalog-tabs']", ".catalog-page__content");
   tabs("[name='catalog-tabs1']", ".catalog-page__content");
   detail();
   about();
});
function home() {
   function application() {
      const form = document.querySelector(".application-section");
      if (!form) return;
      const button = document.querySelector(
         ".application-section__mobile-button",
      );
      const close = document.querySelector(
         ".application-section__mobile-close",
      );
      const modal = document.querySelector(".application-section__modal");
      if (button) {
         button.addEventListener("click", () => {
            modal.classList.add("open");
            bodyLock();
         });
      }
      if (close) {
         close.addEventListener("click", () => {
            modal.classList.remove("open");
            bodyUnLock();
         });
      }
      const regionSelectData = [
         { id: 2, value: "Производство" },
         { id: 3, value: "Торговля" },
         { id: 4, value: "Сервис" },
         { id: 5, value: "IT" },
         { id: 6, value: "Другое" },
         { id: 4, value: "Республика Хакасия" },
      ];

      new Select(form.querySelector("#application-select"), {
         data: regionSelectData,
         placeholder: "Сфера деятельности*",
      });
   }
   function trust() {
      const swiper = new Swiper(".home-trust .swiper", {
         slidesPerView: 1,
         spaceBetween: 24,
         navigation: {
            nextEl: ".home-trust__next",
            prevEl: ".home-trust__prev",
         },
      });
   }
   application();
   trust();
}
function copypaste() {
   const copyLink = document.querySelectorAll(".copypaste");
   if (copyLink.length > 0) {
      for (let i = 0; i < copyLink.length; i++) {
         const link = copyLink[i];
         link.addEventListener("click", () => {
            const content = link.querySelector(".to-copy");
            navigator.clipboard.writeText(content.textContent);
            link.classList.add("copied");
            setTimeout(() => {
               link.classList.remove("copied");
            }, 1000);
         });
      }
   }
}
function header() {
   const burgerBtn = document.querySelector(".burger-btn");
   const headerMenu = document.querySelector(".header-menu");
   const headerMenuBg = document.querySelector(".header-menu__bg");
   if (burgerBtn && headerMenu) {
      burgerBtn.addEventListener("click", () => {
         burgerBtn.classList.toggle("active");
         headerMenu.classList.toggle("open");
      });
   }
   if (headerMenuBg) {
      headerMenuBg.addEventListener("click", (e) => {
         if (e.target.classList.contains("header-menu__bg")) {
            burgerBtn.classList.remove("active");
            headerMenu.classList.remove("open");
         }
      });
   }
}
function catalog() {
   const selectData = [
      { id: 2, value: "Все типы недвижимости" },
      { id: 3, value: "Коммерческая недвижимость" },
      { id: 4, value: "Жилые помещения" },
   ];

   new Select(document.querySelector("#catalog-select1"), {
      data: selectData,
      placeholder: "Сфера деятельности*",
      selectedId: 2,
   });
   new Select(document.querySelector("#catalog-select3"), {
      data: selectData,
      placeholder: "Сфера деятельности*",
      selectedId: 2,
   });
   const selectData1 = [
      { id: 2, value: "Все регионы" },
      { id: 3, value: "Красноярский край" },
      { id: 4, value: "Республика Хакасия" },
      { id: 5, value: "Тюменская область" },
      { id: 6, value: "Омская область" },
      { id: 7, value: "Кемеровская область" },
      { id: 8, value: "Новосибирская область" },
      { id: 9, value: "Томская область" },
      { id: 10, value: "Курганская область" },
      { id: 11, value: "Свердловская область" },
   ];

   new Select(document.querySelector("#catalog-select2"), {
      data: selectData1,
      placeholder: "Сфера деятельности*",
      selectedId: 2,
   });
}

function detail() {
   function hero() {
      const swiper = new Swiper(".detail-hero .swiper", {
         slidesPerView: 1,
         spaceBetween: 24,
         pagination: {
            el: ".detail-hero .swiper-pagination",

            clickable: true,
         },
      });
   }
   hero();
}
function about() {
   function hero() {
      const swiper = new Swiper(".about-hero .swiper", {
         slidesPerView: 1,
         spaceBetween: 24,
         pagination: {
            el: ".about-hero .swiper-pagination",
            clickable: true,
         },
         effect: "fade",
         fadeEffect: {
            crossFade: true,
         },
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         speed: 1000,
         loop: true,
      });
   }

   function awards() {
      const swiper = new Swiper(".about-awards .swiper", {
         slidesPerView: "auto",
         spaceBetween: 24,
         navigation: {
            nextEl: ".about-awards__btn.next",
            prevEl: ".about-awards__btn.prev",
         },
         breakpoints: {
            1025: {
               spaceBetween: 16,
            },
         },
      });
   }
   function team() {
      const swiper = new Swiper(".about-team .swiper", {
         slidesPerView: 1,
         spaceBetween: 24,
         pagination: {
            el: ".about-team .swiper-pagination",
            clickable: true,
         },
         effect: "fade",
         fadeEffect: {
            crossFade: true,
         },
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         speed: 1000,
         loop: true,
      });
   }
   hero();
   awards();
   team();
   regionMapAccordion();
}

function regionMapAccordion() {
   const section = document.querySelector(".about-regions");
   if (!section) {
      return;
   }

   const points = section.querySelectorAll(".region-point[data-region]");
   const accordions = section.querySelectorAll(".region-accordion[data-region]");
   if (!points.length || !accordions.length) {
      return;
   }

   const REGION_ANIM_MS = 550;

   const byRegion = (id) => ({
      point: section.querySelector(`.region-point[data-region="${id}"]`),
      accordion: section.querySelector(`.region-accordion[data-region="${id}"]`),
   });

   const isAnimating = () => section.dataset.regionAnimating === "1";

   const lockAnimation = () => {
      section.dataset.regionAnimating = "1";
      window.setTimeout(() => {
         delete section.dataset.regionAnimating;
      }, REGION_ANIM_MS);
   };

   const regionShow = (el, instant = false) => {
      if (el.classList.contains("collapse_show")) {
         return;
      }
      el.classList.add("collapse");
      el.style.height = "";
      el.style.transition = "";
      el.style.overflow = "";
      if (instant) {
         el.classList.add("is-instant");
      }
      requestAnimationFrame(() => {
         el.classList.add("collapse_show");
         if (instant) {
            requestAnimationFrame(() => {
               el.classList.remove("is-instant");
            });
         }
      });
   };

   const regionHide = (el) => {
      if (!el.classList.contains("collapse_show")) {
         return;
      }
      el.classList.remove("collapse_show");
   };

   const closeAll = () => {
      section
         .querySelectorAll(".region-accordion__collapse")
         .forEach(regionHide);
      section.querySelectorAll(".region-accordion__header").forEach((header) => {
         header.classList.remove("active");
      });
      points.forEach((point) => point.classList.remove("active"));
   };

   const openRegion = (regionId, instant = false) => {
      const { point, accordion } = byRegion(regionId);
      if (!accordion || !point) {
         return;
      }
      const header = accordion.querySelector(".region-accordion__header");
      const content = accordion.querySelector(".region-accordion__collapse");
      closeAll();
      header.classList.add("active");
      regionShow(content, instant);
      point.classList.add("active");
      if (!instant) {
         lockAnimation();
      }
   };

   const toggleRegion = (regionId) => {
      if (isAnimating()) {
         return;
      }
      const { point, accordion } = byRegion(regionId);
      if (!accordion || !point) {
         return;
      }
      const header = accordion.querySelector(".region-accordion__header");
      const content = accordion.querySelector(".region-accordion__collapse");
      const isOpen = content.classList.contains("collapse_show");

      if (isOpen) {
         regionHide(content);
         header.classList.remove("active");
         point.classList.remove("active");
         lockAnimation();
         return;
      }

      openRegion(regionId);
   };

   points.forEach((point) => {
      point.addEventListener("click", () => {
         toggleRegion(point.dataset.region);
      });
   });

   accordions.forEach((accordion) => {
      const header = accordion.querySelector(".region-accordion__header");
      header.addEventListener("click", () => {
         toggleRegion(accordion.dataset.region);
      });
   });

   const initial = section.querySelector(".region-point.active");
   if (initial?.dataset.region) {
      openRegion(initial.dataset.region, true);
   }
}

function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = contents[i];
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}

function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
class Select {
   constructor(selector, options) {
      this.$el =
         typeof selector === "string"
            ? document.querySelector(selector)
            : selector;
      if (!this.$el) {
         return;
      }
      this.options = options;
      this.selectedId = options.selectedId || null;

      this.render();
      this.setup();
   }
   render() {
      this.$el.classList.add("select");
      const { placeholder, data, selectedId } = this.options;
      this.$el.innerHTML = this.getTemplate(data, placeholder, selectedId);
      if (placeholder) {
         this.$el
            .querySelector(`[data-type="input"]`)
            .classList.add("placeholder");
      }
   }
   setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener("click", this.clickHandler);
      this.$value = this.$el.querySelector(`[data-type="input"] span`);
   }
   clickHandler(event) {
      const item = event.target.closest('[data-type="item"]');
      if (item) {
         this.select(item.dataset.id);
         return;
      }
      if (event.target.closest('[data-type="back"]')) {
         this.close();
         return;
      }
      if (event.target.closest(".select__title")) {
         this.toggle();
      }
   }
   get current() {
      return this.options.data.find(
         (item) => String(item.id) === String(this.selectedId),
      );
   }
   select(id) {
      this.$el
         .querySelector(`[data-type="input"]`)
         .classList.remove("placeholder");
      this.selectedId = String(id);

      if (!this.current) {
         console.warn(`Select: item with id "${id}" not found in data`);
         return;
      }

      this.$value.innerHTML = this.current.value;
      this.$el.querySelectorAll(`[data-type="item"]`).forEach((item) => {
         item.classList.remove("selected");
      });
      this.$el
         .querySelector(`[data-id="${this.current.id}"]`)
         .classList.add("selected");
      this.close();

      if (this.options.onSelect) {
         this.options.onSelect(this.current, this.$el);
      }
   }
   open() {
      this.$el.classList.add("open");
   }
   close() {
      this.$el.classList.remove("open");
   }
   toggle() {
      if (this.$el.classList.contains("open")) {
         this.close();
      } else {
         this.open();
      }
   }
   getTemplate(data, placeholder = `<span></span>`, selectedId) {
      const items = data.map((item) => {
         let cls = "";
         if (selectedId && String(item.id) === String(selectedId)) {
            placeholder = item.value;
            cls = "selected";
         }
         return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`;
      });
      return `
      <div class="select__back" data-type="back"></div>
      <div class="select__header">
         <div class="select__title" data-type="input">
            <span>${placeholder}</span>
            <svg class="ui-icon ui-icon_chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
               <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
         </div>
      </div>
      <div class="select__content">
         <ul class="select__list scrollbar-none">
            ${items.join("")}
         </ul>
      </div>
      `;
   }
}

// Popup
const popupLinks = document.querySelectorAll(".modal__link");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupCloseIcon = document.querySelectorAll(".modal__close");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute("href").replace("#", "");
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest(".modal"));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".modal.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest(".modal__content")) {
            popupClose(e.target.closest(".modal"));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const wrapperElement = document.querySelector(".wrapper");
   const lockPaddingValue = wrapperElement
      ? window.innerWidth - wrapperElement.offsetWidth + "px"
      : window.innerWidth - document.body.offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("lock");
   // lenis.stop();

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
      // lenis.start();
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".modal.open");
      popupClose(popupActive);
   }
});
function tabs(linkSelector, contentSelector) {
   const inputs = document.querySelectorAll(linkSelector);
   const contents = document.querySelectorAll(contentSelector);
   let value;
   if (inputs.length) {
      inputs.forEach((item) => {
         item.addEventListener("change", () => {
            if (item.checked) {
               value = item.value;
            }
            contents.forEach((item) => {
               item.classList.remove("active");
               if (item.getAttribute("data-tab") == value) {
                  item.classList.add("active");
               }
            });
         });
      });
   }
}
