class SpiritDocSiteNav {
  static init() {
    // Highlight active page based on current window.location
    const siteNav = document.querySelector('.spirit-doc-site-nav');
    const currentUrl = window.location.pathname;
    if (currentUrl !== '/') {
      const activeLink = siteNav.querySelector('a[href*="' + currentUrl + '"]');
      activeLink.classList.add('spirit-doc-site-nav--active-link');
    }
  }
}

SpiritDocSiteNav.init();
