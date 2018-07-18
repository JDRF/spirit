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
    let scrolling;

    scrollingGrid.addEventListener('scroll', function(e) {
      window.clearTimeout(scrolling);
      scrolling = setTimeout(function(){
        console.log('Update dot indicator');
      }, 65);
    }, false);
  }
}

SpiritCardGrid.init();
