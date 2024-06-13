import { prisma } from "../../prisma/client";
import { UUID } from "crypto";
import { CustomerPostProps } from "../validations/commom.validation";
import { Prisma } from "@prisma/client";
import { Either, left, right } from "fp-ts/lib/Either";

export const createCustomer = async (data: CustomerPostProps): Promise<Either<Error, Prisma.CustomerCreateInput>>  => {
  try {
    const result = await prisma.customer.create({
      data,
    });

    return right(result);
  } catch (error) {
    return left(new Error("Ocorreu um erro no banco de dados ao tentar criar o cliente"));
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
    return null;
  } finally {
    prisma.$disconnect();
  }
};
