import {
  checkUniqueCameraIp,
  createCamera,
  getCameraByUUID,
  getCamerasByCustomerId,
  toggleCamera,
} from "../repositories/cameras.repository";
import { UUID } from "crypto";
import { CameraPostProps, GetCamerasByCustomerIdProps } from "../validations/cameras.validation";
import { getCustomerByUUID } from "../repositories/customers.repository";

export const postCameraService = async (data: CameraPostProps) => {
  try {
    const isIpUnique = await checkUniqueCameraIp(data.ip, data.customerId as UUID);

    if (!isIpUnique) {
        throw new Error('CAMERA_IP_ALREADY_EXISTS_WITH_CUSTOMER');
    }

    const customer = await getCustomerByUUID(data.customerId as UUID);

    if (!customer) {
      throw new Error("CUSTOMER_NOT_FOUND");
    }

    const result = await createCamera(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};

export const patchCameraIsEnabledService = async (id: UUID) => {
  try {
    const camera = await getCameraByUUID(id);

    if (!camera) {
      throw new Error("CAMERA_NOT_FOUND");
    }

    const newState = !camera.isEnabled;

    const result = await toggleCamera(id, newState);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};

export const getCamerasByCustomerIdService = async (data: GetCamerasByCustomerIdProps) => {
  try {
    const customer = await getCustomerByUUID(data.id as UUID);

    if (!customer) {
      throw new Error("CUSTOMER_NOT_FOUND");
    }

    const result = await getCamerasByCustomerId(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
