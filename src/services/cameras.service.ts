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
  cameraNotFound,
  getCamerasByCustomerIdValidation,
  patchCameraStatusValidation,
} from "../validations/cameras.validation";
import { getCustomerByUUID } from "../repositories/customers.repository";
import {
  customerNotFoundValidation,
  ipValidation,
  isEnabledValidation,
  isUUIDvalidation,
} from "../validations/commom.validation";
import { Either, left, right, fold } from "fp-ts/lib/Either";
import { Prisma } from "@prisma/client";

export const postCameraService = async (data: CameraPostProps): Promise<Either<Error, Prisma.CameraCreateInput>> => {
  try {
    if (!data.name) return left(new Error("Nome é obrigatório"));

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

export const patchCameraIsEnabledService = async (id: UUID) => {
  try {
    await patchCameraStatusValidation.validate(id);

    const camera = await getCameraByUUID(id);

    await cameraNotFound.validate({ camera });

    const newState = !camera?.isEnabled;

    const result = await toggleCamera(id, newState);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};

export const getCamerasByCustomerIdService = async (
  data: GetCamerasByCustomerIdProps
) => {
  try {
    await getCamerasByCustomerIdValidation.validate(data);

    const customer = await getCustomerByUUID(data.id as UUID);

    await customerNotFoundValidation.validate({ customer });

    const result = await getCamerasByCustomerId(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
