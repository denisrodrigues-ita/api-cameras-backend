import * as yup from "yup";

export const postCustomerValidation = yup.object().shape({
  name: yup
    .string()
    .typeError("Nome deve conter apenas letras")
    .required("Nome é obrigatório"),
});

export const customerNotFound = yup.object().shape({
  customer: yup.object().required("UUID do cliente não encontrado ou inválido"),
});

export type CustomerPostProps = yup.InferType<typeof postCustomerValidation>;
