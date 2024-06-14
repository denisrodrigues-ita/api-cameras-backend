import { Either, left, right } from "fp-ts/lib/Either";
import { createCustomer } from "../repositories/customers.repository";
import { NameProps } from "../validations";
import { Prisma } from "@prisma/client";
import { langErrors } from "../lang/errors";

export const postCustumerService = async (
  data: NameProps
): Promise<Either<Error, Prisma.CustomerCreateInput>> => {
  try {
    if (!data.name) return left(new Error(langErrors.NAME_REQUIRED));

    if (typeof data.name != "string")
      return left(new Error(langErrors.NAME_MUST_BE_STRING));

    const result = await createCustomer(data);

    if (!result) return left(new Error(langErrors.CUSTOMER_NOT_CREATED));

    return right(result);
  } catch (error) {
    return left(new Error(langErrors.GENERAL_ERROR));
  }
};
