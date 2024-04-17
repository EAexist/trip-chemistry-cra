"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SWIPERPROPS_STEPPER = exports.SWIPERPROPS_PAGE = exports.SWIPERPROPS_HOMECONTENT = exports.SWIPERPROPS_FOODCARDCAROUSEL = exports.SWIPERPROPS_CITYDETAILCONTENT = exports.SWIPERPROPS_CHARACTER_CAROUSEL = exports.SWIPERPROPS_CAROUSEL = exports.AUTOPLAY_DELAY = void 0;
var _modules = require("swiper/modules");
const AUTOPLAY_DELAY = exports.AUTOPLAY_DELAY = 4000;
const SWIPERPROPS_PAGE = exports.SWIPERPROPS_PAGE = {
  speed: 800,
  slidesPerView: 1,
  allowTouchMove: false
};
const SWIPERPROPS_CITYDETAILCONTENT = exports.SWIPERPROPS_CITYDETAILCONTENT = {
  modules: [_modules.Pagination, _modules.Navigation],
  loop: true,
  // rewind: true,
  speed: 800,
  slidesPerView: 1,
  pagination: {
    clickable: true,
    el: '.pageSwiper-pagination'
  },
  navigation: {
    prevEl: `.pageSwiper-prevEl`,
    nextEl: `.pageSwiper-nextEl`
  },
  autoHeight: true
};
const SWIPERPROPS_HOMECONTENT = exports.SWIPERPROPS_HOMECONTENT = {
  modules: [_modules.Pagination, _modules.Autoplay],
  // mousewheel: { thresholdDelta: 100, forceToAxis: true },
  loop: true,
  // rewind: true,
  speed: 800,
  slidesPerView: 1,
  pagination: {
    clickable: true,
    el: '.pageSwiper-pagination'
  },
  // autoHeight: true,
  autoplay: {
    delay: AUTOPLAY_DELAY,
    disableOnInteraction: false
  }
};
const SWIPERPROPS_STEPPER = exports.SWIPERPROPS_STEPPER = {
  // modules: [ Navigation ],
  slidesPerView: 'auto',
  spaceBetween: 16
};
const SWIPERPROPS_CAROUSEL = exports.SWIPERPROPS_CAROUSEL = {
  // loop: true,
  speed: 500,
  slidesPerView: 'auto',
  spaceBetween: 8,
  centerInsufficientSlides: true
  // centeredSlides: true,
};
const SWIPERPROPS_FOODCARDCAROUSEL = exports.SWIPERPROPS_FOODCARDCAROUSEL = {
  modules: [_modules.EffectCoverflow],
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    scale: 0.8,
    slideShadows: false
    // depth: 350,
    // stretch: -16,
  },
  // slidesPerView: 3,
  slidesPerView: 'auto',
  // spaceBetween: ,
  speed: 500,
  allowTouchMove: false,
  centeredSlides: true
};
const SWIPERPROPS_CHARACTER_CAROUSEL = exports.SWIPERPROPS_CHARACTER_CAROUSEL = {
  modules: [_modules.EffectCards],
  effect: 'cards',
  centeredSlides: true,
  grabCursor: true,
  cardsEffect: {
    perSlideOffset: 48,
    slideShadows: false
  }
};