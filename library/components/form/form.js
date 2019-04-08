/* global Inputmask */
class SpiritFormInputMasks {
  static enable() {
    /* eslint-disable new-cap */
    Inputmask({ mask: "99/99/9999", placeholder: "mm/dd/yyyy" }).mask('.spirit-form__input--mask-date');
    Inputmask({ mask: "99/99", placeholder: "mm/yy" }).mask('.spirit-form__input--mask-date-mmyy');
    Inputmask({ mask: "(999) 999-9999" }).mask('.spirit-form__input--mask-tel');
    /* eslint-enable new-cap */
  }
}

SpiritFormInputMasks.enable();

class SpiritFormPasswordToggle {
  static enable() {
    const passwordToggleInputs = Array.from(document.querySelectorAll('.spirit-form__input--password-toggle'));
    passwordToggleInputs.forEach(i => {
      const input = i.querySelector('input');
      const trigger = i.querySelector('a');
      trigger.addEventListener('click', e => {
        if (input.type === 'text') {
          input.type = 'password';
          trigger.textContent = 'Show';
        } else {
          input.type = 'text';
          trigger.textContent = 'Hide';
        }
      });
    });
  }
}

SpiritFormPasswordToggle.enable();
