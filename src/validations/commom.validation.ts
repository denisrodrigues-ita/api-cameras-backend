import * as yup from "yup";

export const hasNameValidation = yup.object().shape({
  name: yup.string().required(),
});

export const customerNotFound = yup.object().shape({
  customer: yup.object().required("Cliente não encontrado"),
});

export type CustomerPostProps = yup.InferType<typeof hasNameValidation>;
