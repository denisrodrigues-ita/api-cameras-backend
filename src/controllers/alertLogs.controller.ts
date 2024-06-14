import { Request, Response } from "express";
import { AlertLogPostProps } from "../validations/alertLogs.validation";
import {
  getAlertLogsService,
  postAlertLogService,
} from "../services/alertLogs.service";
import { fold } from 'fp-ts/Either';

export const postAlertLogController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await postAlertLogService(data as AlertLogPostProps);

    fold(
      (error: Error) => res.status(400).send({message: error.message}),
      (result) => res.status(201).send({ message: "Alerta registrado com sucesso", result })
    )(result);

  } catch (error) {
    res.status(500).send({message: "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde"});
  }
};

export const getAlertLogsByCustomerController = async (req: Request, res: Response) => {
  try {
    const data = {
      id: req.params.id,
      start: req.query.start as string,
      finish: req.query.finish as string,
    };

    const result = await getAlertLogsService(data);

    res.status(200).send({ message: "Alertas listados com sucesso", result });
  } catch (error) {
    res.status(500).send({message: "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde"});
  }
};
