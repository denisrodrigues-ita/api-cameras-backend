import { prisma } from "../../prisma/client";
import { UUID } from "crypto";
import { CustomerPostProps } from "../validations/customer.validation";

export const createCustomer = async (data: CustomerPostProps) => {
  try {
    const result = await prisma.customer.create({
      data,
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getCustomerByUUID = async (id: UUID) => {
  try {
    const result = await prisma.customer.findUnique({
      where: { id },
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getCustomerByName = async (name: string) => {
  try {
    const result = await prisma.customer.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};
