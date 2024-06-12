import { Request, Response } from "express";
import { postAuthService } from "../services/auth.service";
import * as yup from "yup";

export const postAuthController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const token = await postAuthService(data);

    res.status(201).send({ message: "Usuário logado com sucesso", token });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(400).send({
        message:
          "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};
