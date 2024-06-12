import { Request, Response } from "express";
import {
  AlertLogPostProps,
  createAlertLogValidation,
  getAlertLogByCustomer,
} from "../validations/alertLogs.validation";
import {
  getAlertLogsService,
  postAlertLogService,
} from "../services/alertLogs.service";
import * as yup from "yup";

export const postAlertLogController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    await createAlertLogValidation.validate(data);

    const result = await postAlertLogService(data as AlertLogPostProps);

    res.status(201).send({ message: "Alerta registado com sucesso", result });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "CAMERA_NOT_FOUND"
    ) {
      res
        .status(404)
        .send({ message: "UUID da câmera não encontrado ou inválido" });
    } else {
      res.status(500).send({
        message:
          "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};

export const getAlertLogsByCustomerController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = {
      id: req.params.id,
      start: req.query.start as string,
      finish: req.query.finish as string,
    };

    await getAlertLogByCustomer.validate(data);

    const result = await getAlertLogsService(data);

    res.status(200).send({ message: "Câmeras listadas com sucesso", result });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "ALERT_LOGS_NOT_FOUND"
    ) {
      res.status(404).send({ message: "Nenhum alerta encontrado" });
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "CUSTOMER_NOT_FOUND"
    ) {
      res
        .status(404)
        .send({ message: "UUID do cliente não encontrado ou inválido" });
    } else {
      res.status(500).send({
        message:
          "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};
