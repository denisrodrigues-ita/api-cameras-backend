import { UUID } from "crypto";
import { prisma } from "../../prisma/client";
import { AlertLogPostProps } from "../validations/alertLogs.validation";

export const createAlertLog = async (data: AlertLogPostProps) => {
  try {
    const result = await prisma.alertLog.create({
      data,
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};

export const getAlertLogsByCustomer = async (
  id: UUID,
  start?: Date,
  finish?: Date
) => {
  try {
    const filter: any = {
      camera: {
        customerId: id,
      },
    };

    if (start) {
      filter.occurredAt = { ...filter.occurredAt, gte: start };
    }

    if (finish) {
      filter.occurredAt = { ...filter.occurredAt, lte: finish };
    }

    const result = await prisma.alertLog.findMany({
      where: filter,
    });

    return result;
  } catch (error: unknown) {
    throw error;
  } finally {
    prisma.$disconnect();
  }
};
