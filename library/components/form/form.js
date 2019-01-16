class SpiritFormInputMasks {
  static enable() {
    Inputmask({ mask: "99/99/9999", placeholder: "MM/DD/YYYY" }).mask('.spirit-form__input--mask-date');
    Inputmask({ mask: "99/99", placeholder: "MM/YY" }).mask('.spirit-form__input--mask-date-mmyy');
    Inputmask({ mask: "(999) 999-9999" }).mask('.spirit-form__input--mask-tel');
  }
}

SpiritFormInputMasks.enable();
