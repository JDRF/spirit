
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
    };

    modals.forEach(modal => {
        const dialog = new A11yDialog(modal, defaults.container);

        const handleKey = (e) => {
            const modalDialog = modal.querySelector('dialog');

            if (modalDialog.hasAttribute('role') && modalDialog.getAttribute('role') === 'alertdialog' && e.which === 27) {
                e.preventDefault();
            }
        };

        dialog.on('show', function () {
            document.body.classList.add(defaults.noScrollClass);
            document.addEventListener('keydown', handleKey);
        });

        dialog.on('hide', function () {
            document.body.classList.remove(defaults.noScrollClass);
            document.removeEventListener('keydown', handleKey);
        });
    });
};

spiritModals();
