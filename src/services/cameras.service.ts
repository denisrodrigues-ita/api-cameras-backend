import {
  checkUniqueCameraIp,
  createCamera,
  getCameraByUUID,
  getCamerasByCustomerId,
  toggleCamera,
} from "../repositories/cameras.repository";
import { UUID } from "crypto";
import { CameraPostProps, CamerasByCustomerIdProps } from "../interfaces";
import { getCustomerByUUID } from "../repositories/customers.repository";
import {
  ipValidation,
  isEnabledValidation,
  UUIDvalidation,
  statusValidation,
} from "../validations";
import { Either, left, right, fold } from "fp-ts/lib/Either";
import { Prisma } from "@prisma/client";
import { langErrors } from "../lang/errors";

export const postCameraService = async (
  data: CameraPostProps
): Promise<Either<Error, Prisma.CameraCreateInput>> => {
  try {
    if (!data.name) return left(new Error(langErrors.NAME_REQUIRED));

    if (typeof data.name != "string")
      return left(new Error(langErrors.NAME_MUST_BE_STRING));

    if (!data.ip) return left(new Error(langErrors.IP_REQUIRED));

    if (!data.customerId)
      return left(new Error(langErrors.CUSTOMER_ID_REQUIRED));

    if (!data.isEnabled)
      return left(new Error(langErrors.CAMERA_STATUS_REQUIRED));

    const isIpValid = await ipValidation.isValid(data);

    if (!isIpValid) return left(new Error(langErrors.IP_FORMAT_INVALID));

    const isUUID = await UUIDvalidation.isValid({ uuid: data.customerId });

    if (!isUUID) return left(new Error(langErrors.UUID_INVALID));

    const isEnabled = await isEnabledValidation.isValid(data);

    if (!isEnabled) return left(new Error(langErrors.CAMERA_ISENABLED_INVALID));

    data.isEnabled ? (data.isEnabled = true) : (data.isEnabled = false);

    const customer = await getCustomerByUUID(data.customerId as UUID);

    if (!customer) return left(new Error(langErrors.CUSTOMER_NOT_FOUND));

    const isIpUnique = await checkUniqueCameraIp(
      data.ip,
      data.customerId as UUID
    );

    if (!isIpUnique) return left(new Error(langErrors.IP_EXISTS_TO_CUSTOMER));

    const result = await createCamera(data);

    return fold(
      (error: Error) => left(error),
      (result: Prisma.CameraCreateInput) => {
        if (!result) return left(new Error(langErrors.CAMERA_NOT_CREATED));

        return right(result);
      }
    )(result);
  } catch (error) {
    throw error;
  }
};

export const patchCameraIsEnabledService = async (
  cameraId: UUID
): Promise<Either<Error, Prisma.CameraUpdateInput>> => {
  try {
    if (!cameraId) return left(new Error(langErrors.CAMERAID_REQUIRED));

    const isUUID = await UUIDvalidation.isValid({ uuid: cameraId });

    if (!isUUID) return left(new Error(langErrors.UUID_INVALID));

    const camera = await getCameraByUUID(cameraId);

    if (!camera) return left(new Error(langErrors.CAMERA_NOT_FOUND));

    const newState = !camera.isEnabled;

    const result = await toggleCamera(cameraId, newState);

    if (!result) return left(new Error(langErrors.CAMERA_STATUS_NOT_UPDATE));

    return right(result);
  } catch (error) {
    return left(new Error(langErrors.CAMERA_STATUS_NOT_UPDATE));
  }
};

export const getCamerasByCustomerIdService = async (
  data: CamerasByCustomerIdProps
): Promise<Either<Error, Prisma.CameraCreateManyInput>> => {
  try {
    if (!data.id) return left(new Error(langErrors.CUSTOMER_ID_REQUIRED));

    const isUUID = await UUIDvalidation.isValid({ uuid: data.id });

    if (!isUUID) return left(new Error(langErrors.UUID_INVALID));

    const isStatusValid = await statusValidation.isValid(data);

    if (!isStatusValid) return left(new Error(langErrors.STATUS_INVALID));

    const customer = await getCustomerByUUID(data.id as UUID);

    if (!customer) return left(new Error(langErrors.CUSTOMER_NOT_FOUND));

    const result = await getCamerasByCustomerId(data);

    return right(result);
  } catch (error: unknown) {
    return left(new Error(langErrors.GENERAL_ERROR));
  }
};
