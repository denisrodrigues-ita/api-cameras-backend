import * as yup from "yup";

export const createAlertLogValidation = yup.object().shape({
  cameraId: yup
    .string()
    .typeError("cameraId deve ser uma string")
    .uuid("cameraId deve ser um UUID válido")
    .required("cameraId é obrigatório"),
});

export const alertsNotFound = yup.object().shape({
  alerts: yup
    .array().min(1, "Nenhum alerta foi encontrado, tente outro período de tempo ou outro cliente")
    .required("Nenhum alerta foi encontrado, tente outro período de tempo"),
});

export const getAlertLogByCustomer = yup.object().shape({
  id: yup
    .string()
    .typeError("id deve ser uma string")
    .uuid("id deve ser um UUID válido")
    .required("id é obrigatório"),
  start: yup
    .string()
    .optional()
    .test(
      "is-valid-datetime",
      "Formato inválido para start. Use YYYYMMDDHHmm",
      (value) => (value ? isValidDateTimeFormat(value) : true)
    ),
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

export type AlertLogPostProps = yup.InferType<typeof createAlertLogValidation>;
export type AlertLogGetProps = yup.InferType<typeof getAlertLogByCustomer>;
