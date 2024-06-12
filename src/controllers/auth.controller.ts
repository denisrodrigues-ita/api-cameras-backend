import { Request, Response } from "express";
import { authCustomerNameValidation } from "../validations/auth.validation";
import { postAuthService } from "../services/auth.service";
import * as yup from "yup";

export const postAuthController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    await authCustomerNameValidation.validate(data);

    const token = await postAuthService(data);

    res.status(201).send({ message: "Usuário logado com sucesso", token });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "CUSTOMER_NOT_FOUND"
    ) {
      res.status(404).send({ message: "Erro: cliente não encontrado" });
    } else {
      res.status(400).send({
        message:
          "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};
