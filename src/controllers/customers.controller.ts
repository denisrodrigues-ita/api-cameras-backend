import { Request, Response } from "express";
import { postCustumerService } from "../services/customers.service";
import {
  CustomerPostProps,
  postCustomerValidation,
} from "../validations/customer.validation";
import * as yup from "yup";

export const postCustomersController = async (req: Request, res: Response) => {
  try {
    const data: CustomerPostProps = req.body;

    await postCustomerValidation.validate(data);

    const result = await postCustumerService(data);

    res.status(201).send({ message: "Cliente cadastrado", result });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({
        message:
          "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};

export const getCustomersController = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "GET customers" });
  } catch (error) {
    res.status(400);
  }
};
