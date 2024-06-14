import { getCustomerByName } from "../repositories/customers.repository";
import { NameProps } from "../interfaces";
import { generateToken } from "../middlewares/auth.middleware";
import { Either, left, right } from "fp-ts/lib/Either";
import { langErrors } from "../lang/errors";

export const postAuthService = async (
  data: NameProps
): Promise<Either<Error, string>> => {
  try {
    if (!data.name) return left(new Error(langErrors.NAME_REQUIRED));

    if (typeof data.name != "string")
      return left(new Error(langErrors.NAME_MUST_BE_STRING));

    const name = data.name;

    const customer = await getCustomerByName(name);

    if (!customer) return left(new Error(langErrors.CUSTOMER_NOT_FOUND));

    const result = generateToken(name);

    if (!result) return left(new Error(langErrors.TOKEN_NOT_CREATED));

    return right(result);
  } catch (error) {
    return left(new Error(langErrors.GENERAL_ERROR));
  }
};
