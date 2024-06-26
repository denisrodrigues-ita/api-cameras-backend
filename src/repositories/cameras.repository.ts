import { prisma } from "../../prisma/client";
import { UUID } from "crypto";
import { CameraPostProps, CamerasByCustomerIdProps } from "../interfaces";
import { Either, left, right } from "fp-ts/lib/Either";
import { Prisma } from "@prisma/client";

export const createCamera = async (
  data: CameraPostProps
): Promise<Either<Error, Prisma.CameraCreateInput>> => {
  try {
    const result = await prisma.camera.create({
      data,
    });

    return right(result as unknown as Prisma.CameraCreateInput);
  } catch (error) {
    return left(new Error("Erro ao criar a câmera no banco de dados"));
  } finally {
    prisma.$disconnect();
  }
};

export const getCameraByUUID = async (
  id: UUID
): Promise<Prisma.CameraCreateInput | null> => {
  try {
    const result = await prisma.camera.findUnique({
      where: { id },
    });

    return (result as unknown as Prisma.CameraCreateInput) || null;
  } catch (error) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getCamerasByCustomerId = async (
  data: CamerasByCustomerIdProps
): Promise<Prisma.CameraCreateManyInput> => {
  try {
    const result = await prisma.camera.findMany({
      where: {
        customerId: data.id,
        ...(data.status && {
          isEnabled: data.status === "true" ? true : false,
        }),
      },
    });

    return result as unknown as Prisma.CameraCreateManyInput;
  } catch (error) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const toggleCamera = async (
  id: UUID,
  newState: boolean
): Promise<Prisma.CameraUpdateInput> => {
  try {
    const result = await prisma.camera.update({
      where: { id },
      data: {
        isEnabled: newState,
      },
    });

    return result;
  } catch (error) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const checkUniqueCameraIp = async (
  ip: string,
  customerId: UUID
): Promise<boolean> => {
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
