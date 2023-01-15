// UI Layer
export const BASE_LAYER = "z-0";
export const FIRST_LAYER = "z-10";
export const SECOND_LAYER = "z-20";
export const THIRD_LAYER = "z-30";
export const FOURTH_LAYER = "z-40";
export const TOP_LAYER = "z-[99]";
// Validations
export const FORM_FIELD_REQUIRED = "Wajib Diisi";
export const FORM_FIELD_MINIMUM_LENGTH = (fieldName: string, length: number) =>
  `${fieldName} harus terdiri dari minimal ${length} karakter`;

export const PATTERN_ALPHANUMERIC = /^[a-z0-9]+$/i;
export const PATTERN_NUMBER = /^[0-9\b]+$/;

export const PATTERN_EMAIL_VALIDATION =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
export const PATTERN_PHONENUMBER_VALIDATION = /^(\+62|62|0|8)[1-9][0-9]{6,12}$/;

// DATE
export const DEFAULT_DATE_FORMAT = "dd MMM, yyyy H:mm a";
export const TRANSACTION_DATE_FORMAT = "d MMM yyyy HH:mm:ss";
export const DEFAULT_DATE = "d MMM yyyy";
