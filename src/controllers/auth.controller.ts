import { Request, Response } from "express";
import { postAuthService } from "../services/auth.service";
import { fold } from 'fp-ts/Either';

export const postAuthController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const token = await postAuthService(data);

    fold(
      (error: Error) => res.status(400).send({ message: error.message }),
      (token) => res.status(200).send({ message: "Usuário logado com sucesso", token })
    )(token);

  } catch (error: unknown) {
    res.status(500).send({ message: "Ocorreu um erro ao tentar logar o usuário" });
  }
};
