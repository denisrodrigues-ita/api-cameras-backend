import { Either, left, right } from "fp-ts/lib/Either";
import { createCustomer } from "../repositories/customers.repository";
import {CustomerPostProps} from "../validations/commom.validation";
import { Prisma } from "@prisma/client";

export const postCustumerService = async (data: CustomerPostProps): Promise<Either<Error, Prisma.CustomerCreateInput>> => {
  try {
    if (!data.name) return left(new Error("Nome é obrigatório"));

    if (typeof data.name != "string") return left(new Error("Nome deve conter apenas letras"));

    const result = await createCustomer(data);

    if (!result) return left(new Error("Ocorreu um erro ao tentar criar o cliente"));

    return right(result);
  } catch (error) {
    return left(new Error("Ocorreu um erro ao tentar criar o cliente"));
  }
};
