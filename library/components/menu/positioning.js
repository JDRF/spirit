const spiritMenuPositioning = function() {

	const menuContainers = Array.from(document.querySelectorAll('.spirit-menu-wrapper'));

	// Return early if there's no menuContainers.
	if (!menuContainers) {
		return;
	}

	// Setup our variables.
	const menuDistance = 80;
	const arrowCenter = 30;
	const arrowHeight = 18;

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

	// Add our window 'resize' event listener.
	window.addEventListener('resize', debounce(function() {
		processMenus();
	}), false);

	const processMenus = () => {
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

			positionMenus(menu, trigger, viewportHeight, viewportWidth);
		});
	};

	// Handle positioning of each menu.
	const positionMenus = function(menu, trigger, viewportHeight, viewportWidth) {

		resetStyles(menu);

		const {
			bottom: menuBottom,
			left: menurLeft,
			right: menurRight,
			width: menurWidth,
		} = menu.getBoundingClientRect();

		const {
			width: triggerWidth,
			height: triggerHeight,
		} = trigger.getBoundingClientRect();

		// Center menu by default.
		menu.style.left = menurWidth / -2 + triggerWidth / 2 + 'px';
		menu.style.top = triggerHeight + arrowHeight + 'px';

		// Test if menu should be to the right.
		if (menurLeft < menuDistance) {
			menu.style.left = triggerWidth / 2 - arrowCenter + 'px';
			menu.classList.add('spirit-menu--right');
		}

		// Test if menu should be to the left.
		if (viewportWidth - menurRight < menuDistance) {
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
};

spiritMenuPositioning();
