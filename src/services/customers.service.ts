import { Either, left } from "fp-ts/lib/Either";
import { createCustomer } from "../repositories/customers.repository";
import {
  CustomerPostProps,
  hasNameValidation,
} from "../validations/customer.validation";
import { Prisma } from "@prisma/client";

export const postCustumerService = async (data: CustomerPostProps): Promise<Either<Error, Prisma.CustomerCreateInput>> => {
  try {
    const hasName = await hasNameValidation.isValid(data);

    if (!hasName) return left(new Error("Nome é um campo obrigatório"));

    const result = await createCustomer(data);

    if (!result) return left(new Error("Ocorreu um erro ao tentar criar o cliente"));

    return result;
  } catch (error) {
    return left(error as Error);
  }
};
