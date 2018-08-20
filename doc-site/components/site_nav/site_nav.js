class SpiritDocSiteNav {
  static init() {
    console.log("SITE NAV INIT");
    // Highlight active page based on current window.location
    const siteNav = document.querySelector('.spirit-doc-site-nav');
    const currentUrl = window.location.pathname;
    if (currentUrl !== '/') {
      console.log('a[href*="' + currentUrl + '"]');
      const activeLink = siteNav.querySelector('a[href*="' + currentUrl + '"]');
      activeLink.classList.add('spirit-doc-site-nav--active-link');
    }
  }
}

SpiritDocSiteNav.init();
