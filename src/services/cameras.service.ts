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
  isUniqueIpValidation,
  patchCameraStatusValidation,
  postCameraValidation,
} from "../validations/cameras.validation";
import { getCustomerByUUID } from "../repositories/customers.repository";
import { customerNotFound } from "../validations/customer.validation";

export const postCameraService = async (data: CameraPostProps) => {
  try {
    await postCameraValidation.validate(data);

    const customer = await getCustomerByUUID(data.customerId as UUID);

    await customerNotFound.validate({ customer });

    const isIpUnique = await checkUniqueCameraIp(
      data.ip,
      data.customerId as UUID
    );

    await isUniqueIpValidation.validate(isIpUnique);

    const result = await createCamera(data);

    return result;
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

    await customerNotFound.validate({ customer });

    const result = await getCamerasByCustomerId(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
