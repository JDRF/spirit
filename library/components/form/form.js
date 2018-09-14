// class SpiritCardGrid {
//   static init() {
//     // Get all the card grids in the dom and find any that are carousels
//     const carouselGrids = Array.from(document.querySelectorAll('.spirit-card-carousel'));
//     carouselGrids.forEach(c => {
//       SpiritCardGrid.initializeEachCarousel(c);
//     });
//   }

//   static initializeEachCarousel(c) {
//     SpiritCardGrid.addCarouselEventListeners(c);
//     if (SpiritCardGrid.carouselIsActive(c)) {
//       SpiritCardGrid.setActiveCardAriaAttribute(c, 0); // Make the first card the aria-hidden="false" card
//     }
//   }

//   static addCarouselEventListeners(carousel) {
//     const scrollingGrid = carousel.querySelector('.spirit-card-grid');
//     const totalCards = carousel.querySelectorAll('.spirit-card').length;
//     const paginationButtons = Array.from(carousel.querySelectorAll('.spirit-card-carousel__button'));
//     let scrolling;
//     let resizing;

//     paginationButtons.forEach(b => {
//       b.addEventListener('click', function(e) {
//         const indicatorDots = Array.from(carousel.querySelectorAll('.spirit-card-carousel__indicator-dot'));
//         const activeIndex = indicatorDots.findIndex(dot => dot.classList.contains('spirit-card-carousel__indicator-dot--active')); // Get active index
//         let selectedIndex = Math.min(indicatorDots.length, activeIndex + 1); // By default assume the next button was clicked

//         if (this.classList.contains('spirit-card-carousel__button--prev')) {
//           selectedIndex = Math.max(0, activeIndex - 1); // Go back one card if the previous button was clicked
//         }

//         SpiritCardGrid.setActiveCardScrollPosition(carousel, selectedIndex);
//       });
//     });

//     scrollingGrid.addEventListener('scroll', function(e) {
//       if (scrolling) {
//         window.cancelAnimationFrame(scrolling);
//       }

//       scrolling = window.requestAnimationFrame(() => {
//         const scrollPosition = this.scrollLeft;
//         const totalScrollDistance = this.scrollWidth - this.clientWidth;

//         const cardFloat = 1 / totalCards;
//         const indicatorIndex = Math.min(Math.floor(scrollPosition / totalScrollDistance / cardFloat), totalCards - 1);
//         SpiritCardGrid.setActiveIndicator(carousel, indicatorIndex);
//         SpiritCardGrid.setActiveCardAriaAttribute(carousel, indicatorIndex);
//       });
//     }, false);

//     window.addEventListener('resize', function(e) {
//       if (resizing) {
//         window.cancelAnimationFrame(resizing);
//       }

//       resizing = window.requestAnimationFrame(() => {
//         // Inspect the carousel to see if the controls are visible, if not, then disable all aria highlighting of the cards since they're all visible
//         if (SpiritCardGrid.carouselIsActive(carousel)) { // This checks if the controls are visible, if they're not they'll have on offsetParent === null
//           // add carousel aria attributes
//           SpiritCardGrid.setActiveCardAriaAttribute(carousel, 0);
//         } else {
//           // remove carousel aria attributes
//           SpiritCardGrid.removeCarouselAriaAttribute(carousel);
//         }
//       });
//     });
//   }

//   static removeCarouselAriaAttribute(carousel) {
//     const cards = Array.from(carousel.querySelectorAll('.spirit-card'));
//     cards.forEach(c => c.removeAttribute('aria-hidden'));
//   }

//   static carouselIsActive(carousel) {
//     const controls = carousel.querySelector('.spirit-card-carousel__controls');
//     return controls.offsetParent !== null;// This checks if the controls are visible, if they're not they'll have on offsetParent === null
//   }

//   static setActiveCardScrollPosition(carousel, activeIndex) {
//     const cards = Array.from(carousel.querySelectorAll('.spirit-card'));
//     const activeCard = cards[activeIndex];
//     const scrollingGrid = carousel.querySelector('.spirit-card-grid');
//     const cardWidth = activeCard.clientWidth;
//     const viewportWidth = window.innerWidth;
//     const scrollOffset = (viewportWidth - cardWidth) / 2;
//     const scrollPosition = activeCard.offsetLeft - scrollOffset;

//     scrollingGrid.scrollLeft = scrollPosition;
//   }

//   static setActiveCardAriaAttribute(carousel, activeIndex) {
//     const cards = Array.from(carousel.querySelectorAll('.spirit-card'));
//     const activeCard = cards[activeIndex];
//     cards.forEach(c => c.setAttribute('aria-hidden', 'true'));
//     activeCard.setAttribute('aria-hidden', 'false');
//   }

//   static setActiveIndicator(carousel, activeIndex) {
//     const dotActiveClass = 'spirit-card-carousel__indicator-dot--active';
//     const indicatorDots = Array.from(carousel.querySelectorAll('.spirit-card-carousel__indicator-dot'));
//     const cardCount = indicatorDots.length;
//     const prevButton = carousel.querySelector('.spirit-card-carousel__button--prev');
//     const nextButton = carousel.querySelector('.spirit-card-carousel__button--next');
//     indicatorDots.forEach(d => { d.classList.remove(dotActiveClass); });
//     indicatorDots[activeIndex].classList.add(dotActiveClass);

//     // Enable/Disable prev/next buttons
//     if (activeIndex === 0) {
//       prevButton.setAttribute('disabled', true);
//     } else {
//       prevButton.removeAttribute('disabled');
//     }

//     if (activeIndex === cardCount - 1) {
//       nextButton.setAttribute('disabled', true);
//     } else {
//       nextButton.removeAttribute('disabled');
//     }
//   }
// }

// SpiritCardGrid.init();
