import { getCustomerByName } from "../repositories/customers.repository";
import { NameProps } from "../interfaces";
import { generateToken } from "../middlewares/auth.middleware";
import { Either, left, right } from "fp-ts/lib/Either";

export const postAuthService = async (data: NameProps): Promise<Either<Error, string>> => {
  try {
    if (!data.name) return left(new Error("Nome é obrigatório"));

    if (typeof data.name != "string") return left(new Error("Nome deve conter apenas letras"));

    const name = data.name;

    const customer = await getCustomerByName(name);

    if (!customer) return left(new Error("Usuário não encontrado"));

    const result = generateToken(name);

    if (!result) return left(new Error("Ocorreu um erro ao tentar criar um token para o usuário"));

    return right(result);

  } catch (error) {
    return left(new Error("Ocorreu um erro ao tentar logar o usuário"));
  }
};
