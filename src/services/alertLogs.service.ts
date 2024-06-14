import { getCameraByUUID } from "../repositories/cameras.repository";
import { startOfDay, endOfDay } from "date-fns";
import { UUID } from "crypto";
import {
  AlertLogGetProps,
  AlertLogPostProps,
  alertsNotFound,
  getAlertLogByCustomer,
} from "../validations/alertLogs.validation";
import {
  createAlertLog,
  getAlertLogsByCustomer,
} from "../repositories/alertLogs.repository";
import { parseToDateTime } from "../utils/parseToDateTime";
import { getCustomerByUUID } from "../repositories/customers.repository";
import { Prisma } from "@prisma/client";
import { right, left, Either } from 'fp-ts/Either';
import { UUIDvalidation } from "../validations/commom.validation";

export const postAlertLogService = async (data: AlertLogPostProps): Promise<Either<Error, Prisma.AlertLogCreateInput>> => {
  try {
    if (!data.cameraId) return left(new Error("O campo cameraId é obrigatório"));

    const isUUIDValid = await UUIDvalidation.isValid({ uuid: data.cameraId });

    if (!isUUIDValid) return left(new Error("ID inválido"));

    const camera = await getCameraByUUID(data.cameraId as UUID);

    if (!camera) return left(new Error("Câmera não encontrada"));

    const result = await createAlertLog(data);

    if (!result) return left(new Error("Erro ao tentar registrar o alerta"));

    return right(result);
  } catch (error) {
    return left(new Error("Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde"));
  }
};

export const getAlertLogsService = async (data: AlertLogGetProps) => {
  try {
    await getAlertLogByCustomer.validate(data);

    let start: Date | undefined;
    let finish: Date | undefined;
    let id = data.id;

    const customer = await getCustomerByUUID(id as UUID);

    if (!customer) return left(new Error("Cliente não encontrado"));

    if (data.start) {
      start = parseToDateTime(data.start, 0);
    } else {
      start = startOfDay(new Date());
    }

    if (data.finish) {
      finish = parseToDateTime(data.finish, 59);
    } else {
      finish = endOfDay(new Date());
    }

    const alerts = await getAlertLogsByCustomer(id as UUID, start, finish);

    await alertsNotFound.validate({ alerts });

    return alerts;
  } catch (error: unknown) {
    throw error;
  }
};
