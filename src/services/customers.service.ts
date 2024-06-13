import { createCustomer } from "../repositories/customers.repository";
import {
  CustomerPostProps,
  postCustomerValidation,
} from "../validations/customer.validation";

export const postCustumerService = async (data: CustomerPostProps) => {
  try {
    await postCustomerValidation.validate(data);

    const result = await createCustomer(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
