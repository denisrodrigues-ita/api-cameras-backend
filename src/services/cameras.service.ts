import {
  checkUniqueCameraIp,
  createCamera,
  getCameraByUUID,
  getCamerasByCustomerId,
  toggleCamera,
} from "../repositories/cameras.repository";
import { UUID } from "crypto";
import {
  CameraPostProps,
  GetCamerasByCustomerIdProps,
} from "../validations/cameras.validation";
import { getCustomerByUUID } from "../repositories/customers.repository";
import {
  ipValidation,
  isEnabledValidation,
  isUUIDvalidation,
  statusValidation,
} from "../validations/commom.validation";
import { Either, left, right, fold } from "fp-ts/lib/Either";
import { Prisma } from "@prisma/client";

export const postCameraService = async (data: CameraPostProps): Promise<Either<Error, Prisma.CameraCreateInput>> => {
  try {
    if (!data.name) return left(new Error("Nome é obrigatório"));

    if (typeof data.name != "string") return left(new Error("Nome deve conter apenas letras"));

    if (!data.ip) return left(new Error("IP é obrigatório"));

    if (!data.customerId) return left(new Error("ID do cliente é obrigatório"));

    if (!data.isEnabled) return left(new Error("Status da câmera é obrigatório"));

    const isIpValid = await ipValidation.isValid(data);

    if (!isIpValid) return left(new Error("Formato invalido de IP, apenas IPv4 e IPv6 são aceitos"));

    const isUUID = await isUUIDvalidation.isValid({uuid: data.customerId});

    if (!isUUID) return left(new Error("ID inválido"));

    const isEnabled = await isEnabledValidation.isValid(data);

    if (!isEnabled) return left(new Error("Status da câmera é inválido"));

    const customer = await getCustomerByUUID(data.customerId as UUID);

    if (!customer) return left(new Error("Cliente não encontrado"));

    const isIpUnique = await checkUniqueCameraIp(
      data.ip,
      data.customerId as UUID
    );

    if (!isIpUnique) return left(new Error("IP já cadastrado para esse cliente"));

    const result = await createCamera(data);

    return fold(
      (error: Error) => left(error),
      (result: Prisma.CameraCreateInput) => {
        if (!result)
          return left(new Error("Erro ao criar a câmera no banco de dados"));

        return right(result);
      }
    )(result);
  } catch (error: unknown) {
    throw error;
  }
};

export const patchCameraIsEnabledService = async (id: UUID): Promise<Either<Error, Prisma.CameraUpdateInput>> => {
  try {
    if (!id) return left(new Error("ID é obrigatório"));

    const isUUID = await isUUIDvalidation.isValid({uuid: id});

    if (!isUUID) return left(new Error("ID inválido"));

    const camera = await getCameraByUUID(id);

    if(!camera) return left(new Error("Câmera não encontrada"));

    const newState = !camera.isEnabled;

    const result = await toggleCamera(id, newState);

    if (!result) return left(new Error("Erro ao alterar o status da câmera"));

    return right(result);
  } catch (error: unknown) {
    return left(new Error("Erro ao alterar o status da câmera"));
  }
};

export const getCamerasByCustomerIdService = async (data: GetCamerasByCustomerIdProps): Promise<Either<Error, Prisma.CameraCreateManyInput>> => {
  try {
    if (!data.id) return left(new Error("ID do cliente é obrigatório"));

    const isUUID = await isUUIDvalidation.isValid({uuid: data.id});

    if (!isUUID) return left(new Error("UUID inválido"));

    const isStatusValid = await statusValidation.isValid(data);

    if (!isStatusValid) return left(new Error("Status inválido"));

    const customer = await getCustomerByUUID(data.id as UUID);

    if (!customer) return left(new Error("Cliente não encontrado"));

    const result = await getCamerasByCustomerId(data);

    return right(result);
  } catch (error: unknown) {
    return left(new Error("Erro ao buscar as câmeras"));
  }
};
