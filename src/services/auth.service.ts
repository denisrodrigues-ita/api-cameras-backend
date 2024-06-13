import { getCustomerByName } from "../repositories/customers.repository";
import { AuthCustomerNameProps } from "../validations/auth.validation";
import { generateToken } from "../middlewares/auth.middleware";
import { hasNameValidation } from "../validations/commom.validation";
import { Either, left, right, fold } from "fp-ts/lib/Either";

export const postAuthService = async (data: AuthCustomerNameProps): Promise<Either<Error, string>> => {
  try {
    const hasName = await hasNameValidation.isValid(data);

    if (!hasName) return left(new Error("Nome é obrigatório"));

    const name = data.name;

    const customer = await getCustomerByName(name);

    if (!customer) return left(new Error("Usuário não encontrado"));

    const result = generateToken(name);

    return fold(
      (error: Error) => left(error),
      (token: string) => right(token)
    )(result);
  } catch (error) {
    return left(new Error("Ocorreu um erro ao tentar logar o usuário"));
  }
};
