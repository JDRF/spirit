
/*global A11yDialog*/

const spiritModals = function() {
    if (typeof A11yDialog !== "function") {
        return;
    }

    const modals = Array.from(document.querySelectorAll('.spirit-modal'));

    if (!modals) {
        return;
    }

    // Defaults
    const defaults = {
        container: '#spirit-shell-main',
        noScrollClass: '-spirit-no-scroll',
        visibleClass: 'spirit-modal--visible'
    };

    modals.forEach(modal => {
        const dialog = new A11yDialog(modal, defaults.container);

        const maybeDisableEscToClose = (e) => {
            const modalDialog = modal.querySelector('dialog');

            if (modalDialog.getAttribute('role') === 'alertdialog' && e.which === 27) {
                e.preventDefault();
            }
        };

        dialog.on('show', function (el) {
            document.body.classList.add(defaults.noScrollClass);
            el.classList.add(defaults.visibleClass);
            document.addEventListener('keydown', maybeDisableEscToClose);
        });

        dialog.on('hide', function (el) {
            document.body.classList.remove(defaults.noScrollClass);
            el.classList.remove(defaults.visibleClass);
            document.removeEventListener('keydown', maybeDisableEscToClose);
        });
    });
};

spiritModals();
