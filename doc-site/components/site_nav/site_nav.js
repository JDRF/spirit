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

    // Close navigation with esc or click outside navigation
    const listenerCloseOpenMenus = function(e) {
      // Open and close nav with 'return'
      if (e.type === 'keyup' && e.keyCode === 13) {
        toggleNav();
      }

      if (document.documentElement.classList.contains('-spirit-no-scroll')) {

        // if the event is keyup and it was the ESC key
        if (e.type === 'keyup' && e.keyCode === 27) {
          toggleNav();

        // If the event was a mouseup or touchend
        } else if (e.type === 'mouseup' || e.type === 'touchend') {
          if (!navContain.contains(e.target) && toggle !== e.target) {
            toggleNav();
          }
        }
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

      toggle.addEventListener('click', toggleNav);

      // Close the menu by clicking off of them or hitting ESC
      document.addEventListener('mouseup', listenerCloseOpenMenus);
      document.addEventListener('touchend', listenerCloseOpenMenus);
      document.addEventListener('keyup', listenerCloseOpenMenus);
    };

    const destroyNav = function () {
      const toggleExpanded = toggle.getAttribute('aria-expanded');

      if (!toggleExpanded) {
        return;
      }

      toggle.removeAttribute('aria-expanded');
      toggle.removeAttribute('aria-controls');
      navContain.removeAttribute('aria-hidden');

      toggle.removeEventListener('click', toggleNav);
    };

    const toggleNav = function () {
      const expanded = toggle.getAttribute('aria-expanded');

      if (expanded === 'false') {
        toggle.setAttribute('aria-expanded', 'true');
        navContain.setAttribute('aria-hidden', 'false');
        document.addEventListener('keydown', listenerNavTabFocus);
        document.documentElement.classList.add('-spirit-no-scroll');
      } else {
        toggle.setAttribute('aria-expanded', 'false');
        navContain.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', listenerNavTabFocus);
        document.documentElement.classList.remove('-spirit-no-scroll');
      }
    };

    const listenerNavTabFocus = function (e) {
      if (navContain) {
        const navLinks = navContain.querySelectorAll('.spirit-vertical-nav__link');
        const lastLink = navLinks[navLinks.length - 1];

        if (lastLink === document.activeElement && e.which === 9) {
          e.preventDefault();
          toggle.focus();
        }
      }
    };

    var debounce = function (fn) {
      return function () {
        const self = this;
        const args = arguments;

        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(function () {
          fn.apply(self, args);
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
