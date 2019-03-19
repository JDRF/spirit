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

// Toggle flyout navigation for doc site
class SpiritDocSiteNavToggle {
  static init() {
    const toggle = document.getElementById('doc-site-nav-toggle');
    const navContain = document.getElementById('doc-site-nav');
    let timeout;

    if (!toggle || !navContain) {
      return;
    }

    const activateNav = function () {
      if (window.matchMedia("(min-width: 1040px)").matches) {
        destroyNav(toggle, navContain);
      } else {
        createNav(toggle, navContain);
      }
    };

    const createNav = function () {
      const toggleExpanded = toggle.getAttribute('aria-expanded');

      if (toggleExpanded) {
        return;
      }

      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'doc-site-nav');
      navContain.setAttribute('aria-hidden', 'true');

      document.addEventListener('click', toggleNav);
    };

    const destroyNav = function () {
      const toggleExpanded = toggle.getAttribute('aria-expanded');

      if (!toggleExpanded) {
        return;
      }

      toggle.removeAttribute('aria-expanded');
      toggle.removeAttribute('aria-controls');
      navContain.removeAttribute('aria-hidden');

      document.removeEventListener('click', toggleNav);
    };

    const toggleNav = function () {
      const expanded = toggle.getAttribute('aria-expanded');
      const logoLink = navContain.querySelectorAll('.spirit-doc-page-shell__brand-title-link')[0];

      if (expanded === 'false') {
        toggle.setAttribute('aria-expanded', 'true');
        navContain.setAttribute('aria-hidden', 'false');
        document.addEventListener('keydown', listenerNavTabFocus);
        logoLink.focus();
      } else {
        toggle.setAttribute('aria-expanded', 'false');
        navContain.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', listenerNavTabFocus);
      }
    };

    const listenerNavTabFocus = function (e) {

      console.log('here');
      if (navContain) {
        const navLinks = navContain.querySelectorAll('.spirit-vertical-nav__link');
        const lastLink = navLinks[navLinks.length - 1];
        console.log(lastLink);

        if (lastLink === document.activeElement && e.which === 9) {
          e.preventDefault();
          toggle.focus();
        }
      }
    };

    var debounce = function (fn) {
      return function () {
        const context = this;
        const args = arguments;

        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(function () {
          fn.apply(context, args);
        });
      };
    };

    var navDebounce = debounce(function () {
      activateNav(toggle, navContain);
    });

    window.addEventListener('resize', function () {
      navDebounce(toggle, navContain);
    }, false);

    activateNav(toggle, navContain);
  }
}

SpiritDocSiteNav.init();
SpiritDocSiteNavToggle.init();
