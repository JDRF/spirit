class SpiritCardGrid {
  static init() {
    // Get all the card grids in the dom and find any that are carousels
    const carouselGrids = Array.from(document.querySelectorAll('.spirit-card-carousel'));
    carouselGrids.forEach(c => {
      SpiritCardGrid.addCarouselEventListeners(c);
    });
  }

  static addCarouselEventListeners(carousel) {
    const scrollingGrid = carousel.querySelector('.spirit-card-grid');
    const totalCards = carousel.querySelectorAll('.spirit-card').length;
    const paginationButtons = Array.from(carousel.querySelectorAll('.spirit-card-carousel__button'));
    let scrolling;

    paginationButtons.forEach(b => {
      b.addEventListener('click', function(e) {
        const indicatorDots = Array.from(carousel.querySelectorAll('.spirit-card-carousel__indicator-dot'));
        const activeIndex = indicatorDots.findIndex(dot => dot.classList.contains('spirit-card-carousel__indicator-dot--active')); // Get active index
        let selectedIndex = Math.min(indicatorDots.length, activeIndex + 1); // By default assume the next button was clicked

        if (this.classList.contains('spirit-card-carousel__button--prev')) {
          selectedIndex = Math.max(0, activeIndex - 1); // Go back one card if the previous button was clicked
        }

        SpiritCardGrid.setActiveCard(carousel, selectedIndex);
      });
    });

    scrollingGrid.addEventListener('scroll', function(e) {
      window.clearTimeout(scrolling);
      scrolling = setTimeout(() => {
        const scrollPosition = this.scrollLeft;
        const totalScrollDistance = this.scrollWidth - this.clientWidth;

        const cardFloat = 1 / totalCards;
        const indicatorIndex = Math.min(Math.floor(scrollPosition / totalScrollDistance / cardFloat), totalCards - 1);
        SpiritCardGrid.setActiveIndicator(carousel, indicatorIndex);
      }, 35);
    }, false);
  }

  static setActiveCard(carousel, activeIndex) {
    const activeCard = Array.from(carousel.querySelectorAll('.spirit-card'))[activeIndex];
    const scrollingGrid = carousel.querySelector('.spirit-card-grid');
    const cardWidth = activeCard.clientWidth;
    const viewportWidth = window.innerWidth;
    const scrollOffset = (viewportWidth - cardWidth) / 2;
    const scrollPosition = activeCard.offsetLeft - scrollOffset;

    scrollingGrid.scrollLeft = scrollPosition;
    // console.log(scrollPosition, activeCard);
  }

  static setActiveIndicator(carousel, activeIndex) {
    const dotActiveClass = 'spirit-card-carousel__indicator-dot--active';
    const indicatorDots = Array.from(carousel.querySelectorAll('.spirit-card-carousel__indicator-dot'));
    const cardCount = indicatorDots.length;
    const prevButton = carousel.querySelector('.spirit-card-carousel__button--prev');
    const nextButton = carousel.querySelector('.spirit-card-carousel__button--next');
    indicatorDots.forEach(d => { d.classList.remove(dotActiveClass); });
    indicatorDots[activeIndex].classList.add(dotActiveClass);

    // Enable/Disable prev/next buttons
    if (activeIndex === 0) {
      prevButton.setAttribute('disabled', true);
    } else {
      prevButton.removeAttribute('disabled');
    }

    if (activeIndex === cardCount - 1) {
      nextButton.setAttribute('disabled', true);
    } else {
      nextButton.removeAttribute('disabled');
    }
  }
}

SpiritCardGrid.init();
