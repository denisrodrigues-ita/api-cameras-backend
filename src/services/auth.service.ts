import { getCustomerByName } from "../repositories/customers.repository";
import { AuthCustomerNameProps, authCustomerNameValidation } from "../validations/auth.validation";
import { generateToken } from "../middlewares/auth.middleware";
import { customerNotFound } from "../validations/customer.validation";

export const postAuthService = async (data: AuthCustomerNameProps) => {
  try {
    await authCustomerNameValidation.validate(data);
    
    const name = data.name;

    const customer = await getCustomerByName(name);

    await customerNotFound.validate({customer});

    const result = await generateToken(name);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
