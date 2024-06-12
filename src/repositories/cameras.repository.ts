import { prisma } from "../../prisma/client";
import { UUID } from "crypto";
import {
  CameraPostProps,
  GetCamerasByCustomerIdProps,
} from "../validations/cameras.validation";

export const createCamera = async (data: CameraPostProps) => {
  try {
    const result = await prisma.camera.create({
      data,
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getCameraByUUID = async (id: UUID) => {
  try {
    const result = await prisma.camera.findUnique({
      where: { id },
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getCamerasByCustomerId = async (
  data: GetCamerasByCustomerIdProps
) => {
  try {
    const result = await prisma.camera.findMany({
      where: {
        customerId: data.id,
        ...(data.status && {
          isEnabled: data.status === "true" ? true : false,
        }),
      },
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const toggleCamera = async (id: UUID, newState: boolean) => {
  try {
    const result = await prisma.camera.update({
      where: { id },
      data: {
        isEnabled: newState,
      },
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const checkUniqueCameraIp = async (ip: string, customerId: UUID): Promise<boolean> => {
  try {
    const result = await prisma.camera.findFirst({
      where: {
        ip,
        customerId,
      },
    });

    return !result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};
