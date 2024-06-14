import * as yup from "yup";

export const hasNameValidation = yup.object().shape({
  name: yup.string().required(),
});

export const ipValidation = yup.object().shape({
  ip: yup
    .string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$|((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:|([0-9A-Fa-f]{1,4}|([0-9]{1,3}\.){3}[0-9]{1,3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:([0-9A-Fa-f]{1,4}|:))|(:((([0-9A-Fa-f]{1,4}:){1,4})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){4}(((:(([0-9A-Fa-f]{1,4}:){1,3}|:))|(:((([0-9A-Fa-f]{1,4}:){2,4})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:(([0-9A-Fa-f]{1,4}:){1,2}|:))|(:((([0-9A-Fa-f]{1,4}:){3,5})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){4,6})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){5,7})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(:(:(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){6})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))))$/,
     
    ),
});

export const isEnabledValidation = yup.object().shape({
  isEnabled: yup
    .boolean()
    .required(),
});

export const UUIDvalidation = yup.object().shape({
  uuid: yup.string().uuid().required(),
});

export const statusValidation = yup.object().shape({
  status: yup
  .string()
  .oneOf(["true", "false"], "state deve ser 'true' ou 'false'")
  .typeError("state deve ser uma string")
  .optional(),
});

export const startDateValidation = yup.object().shape({
  start: yup
    .string()
    .optional()
    .test(
      "is-valid-datetime",
      "Formato inválido para start. Use YYYYMMDDHHmm",
      (value) => (value ? isValidDateTimeFormat(value) : true)
    ),
});

export const finishDateValidation = yup.object().shape({
  finish: yup
    .string()
    .optional()
    .test(
      "is-valid-datetime",
      "Formato inválido para finish. Use YYYYMMDDHHmm",
      (value) => (value ? isValidDateTimeFormat(value) : true)
    ),
});

const isValidDateTimeFormat = (value: string): boolean => {
  const regex = /^\d{12}$/;
  if (!regex.test(value)) {
    return false;
  }

  const year = parseInt(value.substring(0, 4), 10);
  const month = parseInt(value.substring(4, 6), 10);
  const day = parseInt(value.substring(6, 8), 10);
  const hour = parseInt(value.substring(8, 10), 10);
  const minute = parseInt(value.substring(10, 12), 10);

  if (year < 1000 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (hour < 0 || hour > 23) return false;
  if (minute < 0 || minute > 59) return false;

  return true;
};

export type CustomerPostProps = yup.InferType<typeof hasNameValidation>;
