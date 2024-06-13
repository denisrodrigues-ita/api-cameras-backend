import { prisma } from "../../prisma/client";
import { UUID } from "crypto";
import { CustomerPostProps } from "../validations/customer.validation";
import { Prisma } from "@prisma/client";
import { Either, right, left } from "fp-ts/lib/Either";

export const createCustomer = async (data: CustomerPostProps): Promise<Either<Error, Prisma.CustomerCreateInput>>  => {
  try {
    const result = await prisma.customer.create({
      data,
    });

    return right(result);
  } catch (error) {
    return left(error as Error);
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
