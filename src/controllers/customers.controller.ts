import { Request, Response } from "express";
import { postCustumerService } from "../services/customers.service";
import { CustomerPostProps } from "../validations/commom.validation";
import { fold } from 'fp-ts/Either';

export const postCustomersController = async (req: Request, res: Response) => {
  try {
    const data: CustomerPostProps = req.body;

    const result = await postCustumerService(data);

    fold(
      (error: Error) => res.status(400).send({ message: error.message }),
      (result) => res.status(201).send({ message: "Cliente cadastrado com sucesso", result })
    )(result);
    
  } catch (error) {
    res.status(500).send({ message: "Ocorreu um erro ao tentar cadastrar o cliente" });
  }
};
