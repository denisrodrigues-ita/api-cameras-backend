import { prisma } from "../../prisma/client";
import { UUID } from "crypto";
import { CustomerPostProps } from "../validations/commom.validation";
import { Prisma } from "@prisma/client";

export const createCustomer = async (data: CustomerPostProps): Promise<Prisma.CustomerCreateInput>  => {
  try {
    const result = await prisma.customer.create({
      data,
    });

    return result;
  } catch (error) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getCustomerByUUID = async (id: UUID): Promise<Prisma.CustomerCreateInput | null> => {
  try {
    const result = await prisma.customer.findUnique({
      where: { id },
    });

    return result;
  } catch (error) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getCustomerByName = async (name: string): Promise<Prisma.CustomerCreateInput | null> => {
  try {
    const result = await prisma.customer.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });

    return result;
  } catch (error) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};
