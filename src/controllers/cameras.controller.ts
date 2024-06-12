import { Request, Response } from "express";
import {
  CameraPostProps,
  GetCamerasByCustomerIdProps,
  getCamerasByCustomerIdValidation,
  postCameraValidation,
} from "../validations/cameras.validation";
import {
  getCamerasByCustomerIdService,
  patchCameraIsEnabledService,
  postCameraService,
} from "../services/cameras.service";
import * as yup from "yup";
import { UUID } from "crypto";

export const postCameraController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    await postCameraValidation.validate(data);

    const result = await postCameraService(data as CameraPostProps);

    res.status(201).send({ message: "Câmera cadastrada", result });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "CUSTOMER_NOT_FOUND"
    ) {
      res.status(404).send({ message: "Erro: UUID do cliente não encontrado" });
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "CAMERA_IP_ALREADY_EXISTS_WITH_CUSTOMER"
    ) {
      res
        .status(409)
        .send({ message: "Erro: Esse IP já existe para esse cliente." });
    } else {
      res.status(500).send({
        message:
          "Erro: Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde",
      });
    }
  }
};

export const patchCameraIsEnabledController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    await getCamerasByCustomerIdValidation.validate({ id });

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
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "CAMERA_NOT_FOUND"
    ) {
      res.status(404).send({ message: "Erro: Câmera não encontrada" });
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

    await getCamerasByCustomerIdValidation.validate(data);

    const result = await getCamerasByCustomerIdService(
      data as GetCamerasByCustomerIdProps
    );

    res
      .status(200)
      .send({ message: "Câmeras encontradas com sucesso", result });
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      res.status(400).send({ message: error.message });
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      error.message === "CUSTOMER_NOT_FOUND"
    ) {
      res.status(404).send({ message: "Erro: UUID do cliente não encontrado" });
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
