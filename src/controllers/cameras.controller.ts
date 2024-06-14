import { Request, Response } from "express";
import {GetCamerasByCustomerIdProps} from "../validations/cameras.validation";
import {
  getCamerasByCustomerIdService,
  patchCameraIsEnabledService,
  postCameraService,
} from "../services/cameras.service";
import * as yup from "yup";
import { UUID } from "crypto";
import { fold } from 'fp-ts/Either';
import { Prisma } from "@prisma/client";

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

    fold(
      (error: Error) => res.status(400).send({ message: error.message }),
      (result: Prisma.CameraUpdateInput) =>
        res.status(200).send({ message: `Câmera ${result.isEnabled ? "ativada" : "desativada"} com sucesso`, result })
    
    )(result)

  } catch (error) {
    res.status(500).send({ message: "Ocorreu um erro ao tentar alterar o status da câmera" });
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

    fold(
      (error: Error) => res.status(400).send({ message: error.message }),
      (result) =>
        res.status(200).send({ message: "Câmeras encontradas com sucesso", result })
    )(result);

  } catch (error: unknown) {
    res.status(500).send({ message: "Ocorreu um erro ao tentar buscar as câmeras" });
  }
};
