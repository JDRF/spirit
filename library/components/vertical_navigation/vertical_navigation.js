/**
 * Vertical Navigation Setup + Actions
 *
 * @return {void}
 */
const spiritVerticalNavigation = () => {
  const vertNavItems = Array.from(document.querySelectorAll('.spirit-vertical-nav'));

  if (!vertNavItems) {
    return;
  }

  /**
   * Initialize Each Vertical Nav
   *
   * @param {object} n Navigation Item
   * @return {void}
   */
  const initializeEachNav = (n) => {
    const parentItems = Array.from(n.querySelectorAll('.spirit-vertical-nav__item-parent'));
    // const parentItemsCount = parentItems.length;

    const menuSubOpen = (closedItem) => {

      closedItem.classList.add('submenu-is-open');
      closedItem.parentNode.classList.add('child-has-focus');
      closedItem.setAttribute('aria-expanded', true);

      if (closedItem.parentNode.querySelector('.spirit-vertical-nav__subnav')) {
        closedItem.parentNode.querySelector('.spirit-vertical-nav__subnav').setAttribute('aria-hidden', 'false');
      }

    }; // menuSubOpen()

    /**
     * Close Sub Menu(s)
     *
     * @param {object} openItem Open Subnav Item
     */
    const menuSubClose = (openItem) => {

      openItem.classList.remove('submenu-is-open');
      openItem.parentNode.classList.remove('child-has-focus');
      openItem.setAttribute('aria-expanded', false);

      if (openItem.parentNode.querySelector('.sub-menu')) {
        openItem.parentNode.querySelector('.sub-menu').setAttribute('aria-hidden', 'true');
      }

    }; // menuSubClose()

    /**
     * Listener Action for Submenu Trigger Click
     * @param {object} e event
     */
    const listnerSubmenuClick = (e) => {
      const target = e.currentTarget;

      if (target.getAttribute('aria-haspopup')) {

        // Stop links from firing
        e.preventDefault();

        // Stop events from bubbling up to parent elements
        e.stopPropagation();

        const parentMenu = target.parentNode;
        const allOpenMenuTriggers = Array.from(n.querySelectorAll('.child-has-focus > a.submenu-is-open:not(.spirit-vertical-nav__link--expanded)'));
        const allOpenMenuTriggersCount = allOpenMenuTriggers.length;

        if (allOpenMenuTriggersCount > 0) {

          // Make sure only 1 menu item can be opened at a time
          allOpenMenuTriggers.forEach(t => {
            // Check if the open menu is top-level, if so, close it
            if (parentMenu.parentNode.parentNode === n && t !== target) {
              menuSubClose(t);
            }
          });

        } // if

        if (e.currentTarget.nodeName === 'A' && target.classList.contains('submenu-is-open')) {

          // The menu is already open, so this should be a close action
          menuSubClose(target);

        } else {

          // The menu is closed, so this click should open it
          menuSubOpen(target);

        }
      }
    };

    /**
     * Listener Action for Submenu Trigger Click
     * @param {object} evt event
     */
    const listnerSubmenuFocus = (evt) => {

      if (!evt.type === 'keyup' || !evt.keyCode === 9) {
        return;
      }

      const target = evt.currentTarget;
      const parentMenu = target.parentNode;
      const allOpenMenuTriggers = Array.from(n.querySelectorAll('.child-has-focus > a.submenu-is-open'));
      const allOpenMenuTriggersCount = allOpenMenuTriggers.length;

      if (allOpenMenuTriggersCount > 0) {

        // Make sure only 1 menu item can be opened at a time
        allOpenMenuTriggers.forEach(t => {
          // Check if the open menu is top-level, if so, close it
          if (parentMenu.parentNode.parentNode === n) {
            menuSubClose(t);
          }
        });
      }

      menuSubOpen(target);
    };

    /**
     * Loop through parent items
     */
    parentItems.forEach(p => {
      const trigger = p.querySelector('a');
      const subNav = p.querySelector('.spirit-vertical-nav__subnav');

      if (!trigger || !subNav) {
        return;
      }

      // Let a screen reader know this menu has a submenu by hooking into the first link
      trigger.setAttribute('aria-haspopup', 'true');
      if (!trigger.hasAttribute('aria-expanded')) {
        trigger.setAttribute('aria-expanded', 'false');
      }

      // Hide and label each sub menu
      subNav.setAttribute('aria-haspopup', 'true');
      subNav.setAttribute('aria-label', 'Submenu');

      trigger.addEventListener('click', listnerSubmenuClick);

      trigger.addEventListener('keydown', listnerSubmenuFocus);

    });
  };

  /**
   * Loop through vertical navigation elements
   */
  vertNavItems.forEach(n => {
    initializeEachNav(n);
  });
};

spiritVerticalNavigation();
