import { getCameraByUUID } from "../repositories/cameras.repository";
import { startOfDay, endOfDay } from "date-fns";
import { UUID } from "crypto";
import { AlertLogGetProps, AlertLogPostProps } from "../interfaces";
import {
  createAlertLog,
  getAlertLogsByCustomer,
} from "../repositories/alertLogs.repository";
import { parseToDateTime } from "../utils/parseToDateTime";
import { getCustomerByUUID } from "../repositories/customers.repository";
import { Prisma } from "@prisma/client";
import { right, left, Either } from "fp-ts/Either";
import {
  UUIDvalidation,
  finishDateValidation,
  startDateValidation,
} from "../validations";

export const postAlertLogService = async (
  data: AlertLogPostProps
): Promise<Either<Error, Prisma.AlertLogCreateInput>> => {
  try {
    if (!data.cameraId)
      return left(new Error("O campo cameraId é obrigatório"));

    const isUUIDValid = await UUIDvalidation.isValid({ uuid: data.cameraId });

    if (!isUUIDValid) return left(new Error("ID inválido"));

    const camera = await getCameraByUUID(data.cameraId as UUID);

    if (!camera) return left(new Error("Câmera não encontrada"));

    const result = await createAlertLog(data);

    if (!result) return left(new Error("Erro ao tentar registrar o alerta"));

    return right(result);
  } catch (error) {
    return left(
      new Error(
        "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde"
      )
    );
  }
};

export const getAlertLogsService = async (
  data: AlertLogGetProps
): Promise<Either<Error, Prisma.AlertLogCreateInput[]>> => {
  try {
    let start: Date | undefined;
    let finish: Date | undefined;

    if (!data.id) return left(new Error("O campo id é obrigatório"));

    const isUUIDValid = await UUIDvalidation.isValid({ uuid: data.id });

    if (!isUUIDValid) return left(new Error("ID inválido"));

    if (data.start) {
      const isStartValid = await startDateValidation.isValid({
        start: data.start,
      });

      if (!isStartValid)
        return left(new Error("Formato inválido para start. Use YYYYMMDDHHmm"));

      start = parseToDateTime(data.start, 0);
    } else {
      start = startOfDay(new Date());
    }

    if (data.finish) {
      const isFinishValid = await finishDateValidation.isValid({
        finish: data.finish,
      });

      if (!isFinishValid)
        return left(
          new Error("Formato inválido para finish. Use YYYYMMDDHHmm")
        );

      finish = parseToDateTime(data.finish, 59);
    } else {
      finish = endOfDay(new Date());
    }

    const customer = await getCustomerByUUID(data.id as UUID);

    if (!customer) return left(new Error("Cliente não encontrado"));

    const alerts = await getAlertLogsByCustomer(data.id as UUID, start, finish);

    if (alerts.length === 0)
      return left(
        new Error("Alertas não encontrados, tente outro período de tempo")
      );

    if (!alerts) return left(new Error("Alertas não encontrados"));

    return right(alerts);
  } catch (error) {
    return left(
      new Error(
        "Ocorreu um erro ao tentar lidar com os dados, tente novamente mais tarde"
      )
    );
  }
};
