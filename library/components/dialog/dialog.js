
/*global A11yDialog*/

const spiritDialogs = function() {
    if (typeof A11yDialog !== "function") {
        return;
    }

    const dialogs = Array.from(document.querySelectorAll('.spirit-dialog'));

    if (!dialogs) {
        return;
    }

    // Defaults
    const defaults = {
        container: '#spirit-shell-main',
        noScrollClass: '-spirit-no-scroll'
    };

    dialogs.forEach(item => {
        const dialog = new A11yDialog(item, defaults.container);
        const spiritDialog = item.querySelector('.spirit-dialog__dialog');

        const maybeDisableEscToClose = (e) => {

            if (spiritDialog && spiritDialog.getAttribute('role') === 'alertdialog' && e.which === 27) {
                e.preventDefault();
            }
        };

        dialog.on('show', function (el) {

            // Ensure focus is on first item - wait until animation finished first
            spiritDialog.addEventListener('transitionend', transitionEndCallback);

            function transitionEndCallback() {
                const focusableChildren = spiritDialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const focused = spiritDialog.querySelector('[autofocus]') || focusableChildren[0];

                if (focused) {
                    focused.focus();
                }

                spiritDialog.removeEventListener('transitionend', transitionEndCallback);
            }

            document.body.classList.add(defaults.noScrollClass);
            document.addEventListener('keydown', maybeDisableEscToClose);
        });

        dialog.on('hide', function (el) {
            document.body.classList.remove(defaults.noScrollClass);
            document.removeEventListener('keydown', maybeDisableEscToClose);
        });
    });
};

spiritDialogs();
