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
