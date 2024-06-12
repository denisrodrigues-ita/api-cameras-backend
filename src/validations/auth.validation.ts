import * as yup from "yup";

export const authCustomerNameValidation = yup.object().shape({
  name: yup.string().required(),
});

export type AuthCustomerNameProps = yup.InferType<typeof authCustomerNameValidation>;