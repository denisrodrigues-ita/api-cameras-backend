import { Request, Response } from "express";
import {
  CameraPostProps,
  GetCamerasByCustomerIdProps,
} from "../validations/cameras.validation";
import {
  getCamerasByCustomerIdService,
  patchCameraIsEnabledService,
  postCameraService,
} from "../services/cameras.service";
import * as yup from "yup";
import { UUID } from "crypto";
import { fold } from 'fp-ts/Either';

export const postCameraController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await postCameraService(data);

    fold(
      (error: Error) => res.status(400).send({ message: error.message }),
      (result) =>
        res.status(201).send({ message: "Câmera criada com sucesso", result })
    )(result);

  } catch (error) {
    res.status(500).send({ message: "Ocorreu um erro ao tentar criar uma câmera" });
  }
};

export const patchCameraIsEnabledController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.body.id;

    const result = await patchCameraIsEnabledService(id as UUID);

    res.status(200).send({
      message: `${
        result.isEnabled
          ? "Câmera ativada com sucesso"
          : "Câmera desativada com sucesso"
      }`,
      result,
    });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({
        message:
          "Erro: Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};

export const getCamerasByCustomerIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = {
      id: req.params.customerId,
      status: req.query.status,
    };

    const result = await getCamerasByCustomerIdService(
      data as GetCamerasByCustomerIdProps
    );

    res
      .status(200)
      .send({ message: "Câmeras encontradas com sucesso", result });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(400).send({
        message:
          "Erro: Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};

export const getCamerasController = (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "GET cameras" });
  } catch (error) {
    res.status(400);
  }
};
