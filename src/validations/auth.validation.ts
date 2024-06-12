import * as yup from "yup";

export const authCustomerNameValidation = yup.object().shape({
  name: yup.string().typeError("Nome deve ser uma string").required("Nome é obrigatório"),
});

export type AuthCustomerNameProps = yup.InferType<typeof authCustomerNameValidation>;