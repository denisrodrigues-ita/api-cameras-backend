import { Either, fold, left, right } from "fp-ts/lib/Either";
import { createCustomer } from "../repositories/customers.repository";
import {CustomerPostProps, hasNameValidation} from "../validations/commom.validation";
import { Prisma } from "@prisma/client";

export const postCustumerService = async (data: CustomerPostProps): Promise<Either<Error, Prisma.CustomerCreateInput>> => {
  try {
    const hasName = await hasNameValidation.isValid(data);

    if (!hasName) return left(new Error("Nome é obrigatório"));

    const result = await createCustomer(data);

    return fold(
      (error: Error) => left(error),
      (result: Prisma.CustomerCreateInput) => {
        if (!result) return left(new Error("Ocorreu um erro ao tentar criar o cliente"));

        return right(result);
      }
    )(result);

  } catch (error) {
    return left(new Error("Ocorreu um erro ao tentar criar o cliente"));
  }
};
