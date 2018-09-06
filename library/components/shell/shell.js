/**
 * Vertical Navigation Setup + Actions -- for Demonstration Purposes
 *
 * @return {void}
 */
const demoPrimaryNavigation = () => {
  const headerNav = document.getElementById('header-nav-demo');

  if (!headerNav) {
    return;
  }

  /**
   * Initialize Each Vertical Nav
   *
   * @return {void}
   */
  const demoNavActions = () => {
    const navTriggers = Array.from(document.querySelectorAll('.header-nav-demo-trigger'));
    const spiritNavActiveClass = '-js-spirit-primary-nav-active';

    if (!navTriggers) {
      return;
    }

    /**
     * Toggle Navigation - add or remove class to body if toggle clicked
     *
     * @param {object} e event
     */
    const toggleNavigation = (e) => {
      e.preventDefault();
      document.body.classList.toggle(spiritNavActiveClass);
    };

    /**
     * Loop through nav triggers
     */
    navTriggers.forEach(n => {
      n.addEventListener('click', toggleNavigation);
    });

  };

  demoNavActions();

};

demoPrimaryNavigation();
