const spiritMenuPositioning = function(selector) {

	if (!selector) {
		selector = '.spirit-menu-wrapper';
	}

	const menuContainers = Array.from(document.querySelectorAll(selector));

	// Return early if there's no menuContainers.
	if (!menuContainers) {
		return;
	}

	// Setup our variables.
	const menuDistance = 40;
	const arrowCenter = 30;
	const arrowHeight = 18;

	// The main function that will run on resize.
	const processMenus = function() {
		// Get updated viewport sizes.
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;

		// Process each menuContainer.
		menuContainers.forEach(function(menuContainer) {
			const menu = menuContainer.querySelector('.spirit-menu');
			const trigger = menuContainer.querySelector('button');

			// Return early if there's not both a trigger and a menu available.
			if (!trigger || !menu) {
				return;
			}

			positionMenu(menu, trigger, viewportHeight, viewportWidth);
		});
	};

	// Handle positioning of each menu.
	const positionMenu = function(menu, trigger, viewportHeight, viewportWidth) {

		resetStyles(menu);

		// Center menu by default.
		menu.style.left = menu.getBoundingClientRect().width / -2 + trigger.getBoundingClientRect().width / 2 + 'px';
		menu.style.top = trigger.getBoundingClientRect().height + arrowHeight + 'px';

		// Get new positioning after being centered.
		const {
			bottom: menuBottom,
			left: menuLeft,
			right: menuRight,
			width: menuWidth,
		} = menu.getBoundingClientRect();

		const {
			width: triggerWidth,
			height: triggerHeight,
		} = trigger.getBoundingClientRect();

		// Test if menu should be to the right.
		// If the trigger is wider than the menu, the menu can remain centered.
		if (triggerWidth < menuWidth && menuLeft < menuDistance) {
			menu.style.left = triggerWidth / 2 - arrowCenter + 'px';
			menu.classList.add('spirit-menu--right');
		}

		// Test if menu should be to the left.
		// If the trigger is wider than the menu, the menu can remain centered.
		if (triggerWidth < menuWidth && viewportWidth - menuRight < menuDistance) {
			menu.style.left = 'auto';
			menu.style.right = triggerWidth / 2 - arrowCenter + 'px';
			menu.classList.add('spirit-menu--left');
		}

		// Test if menu should be above.
		if (viewportHeight - menuBottom < menuDistance) {
			menu.style.top = 'auto';
			menu.style.bottom = triggerHeight + arrowHeight + 'px';
			menu.classList.add('spirit-menu--above');
		}
	};

	// Reset styles since we need to recalculate them.
	const resetStyles = function(menu) {
		if (menu.classList.contains('spirit-menu--right')) {
			menu.classList.remove('spirit-menu--right');
		}

		if (menu.classList.contains('spirit-menu--left')) {
			menu.classList.remove('spirit-menu--left');
		}

		if (menu.classList.contains('spirit-menu--above')) {
			menu.classList.remove('spirit-menu--above');
		}

		menu.style.bottom = 'auto';
		menu.style.left = 'auto';
		menu.style.right = 'auto';
		menu.style.top = 'auto';
	};

	// Create a debounce function for 'resize' event listener.
	let timeout;
	const debounce = function (fn) {
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

	// Run on initial page load.
	processMenus();

	// Add our window 'resize' event listener.
	window.addEventListener('resize', debounce(function() {
		processMenus();
	}), false);
};

spiritMenuPositioning('.spirit-menu-wrapper--demo');
