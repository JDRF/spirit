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
      const trigger = i.querySelector('.spirit-form__input-password-toggle');
      const triggerIconHide = trigger.querySelector('svg[aria-label="Hide"]');
      const triggerIconShow = trigger.querySelector('svg[aria-label="Show"]');

      // A11y Setup
      if (triggerIconHide.getAttribute("aria-hidden") === 'true') {
        trigger.setAttribute('aria-pressed', 'false');
      } else {
        trigger.setAttribute('aria-pressed', 'true');
      }

      // On input focus
      input.addEventListener('focus', () => {
        i.classList.toggle('spirit-form__input--password-toggle--focus');
      });

      // In input blur
      input.addEventListener('blur', () => {
        i.classList.toggle('spirit-form__input--password-toggle--focus');
      });

      // On toggle show password click
      trigger.addEventListener('click', e => {
        e.preventDefault();
        if (input.type === 'text') {
          input.type = 'password';
          trigger.setAttribute('aria-pressed', 'false');
          triggerIconHide.setAttribute('aria-hidden', 'false');
          triggerIconShow.setAttribute('aria-hidden', 'true');
        } else {
          input.type = 'text';
          trigger.setAttribute('aria-pressed', 'true');
          triggerIconHide.setAttribute('aria-hidden', 'true');
          triggerIconShow.setAttribute('aria-hidden', 'false');
        }
      });
    });
  }
}

SpiritFormPasswordToggle.enable();
