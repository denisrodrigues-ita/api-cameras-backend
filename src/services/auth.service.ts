import { getCustomerByName } from "../repositories/customers.repository";
import { AuthCustomerNameProps } from "../validations/auth.validation";
import { generateToken } from "../middlewares/auth.middleware";

export const postAuthService = async (data: AuthCustomerNameProps) => {
  try {
    const name = data.name;

    const customer = await getCustomerByName(name);

    if (!customer) {
      throw new Error("CUSTOMER_NOT_FOUND");
    }

    const result = await generateToken(name);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
