
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

        console.log('there');

        const maybeDisableEscToClose = (e) => {
            const spiritDialog = item.querySelector('.spirit-dialog__dialog');

            console.log(item);

            if (spiritDialog && spiritDialog.getAttribute('role') === 'alertdialog' && e.which === 27) {
                e.preventDefault();
            }
        };

        dialog.on('show', function (el) {
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
