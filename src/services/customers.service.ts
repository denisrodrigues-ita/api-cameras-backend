import { createCustomer } from "../repositories/customers.repository";
import { CustomerPostProps } from "../validations/customer.validation";

export const postCustumerService = async (data: CustomerPostProps) => {
  try {
    const result = await createCustomer(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
