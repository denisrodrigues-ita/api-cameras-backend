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
import { langErrors } from "../lang/errors";

export const postAlertLogService = async (
  data: AlertLogPostProps
): Promise<Either<Error, Prisma.AlertLogCreateInput>> => {
  try {
    if (!data.cameraId) return left(new Error(langErrors.CAMERAID_REQUIRED));

    const isUUIDValid = await UUIDvalidation.isValid({ uuid: data.cameraId });

    if (!isUUIDValid) return left(new Error(langErrors.UUID_INVALID));

    const camera = await getCameraByUUID(data.cameraId as UUID);

    if (!camera) return left(new Error(langErrors.CAMERA_NOT_FOUND));

    const result = await createAlertLog(data);

    if (!result) return left(new Error(langErrors.ALERT_LOG_NOT_CREATED));

    return right(result);
  } catch (error) {
    return left(new Error(langErrors.GENERAL_ERROR));
  }
};

export const getAlertLogsService = async (
  data: AlertLogGetProps
): Promise<Either<Error, Prisma.AlertLogCreateInput[]>> => {
  try {
    let start: Date | undefined;
    let finish: Date | undefined;

    if (!data.id) return left(new Error(langErrors.ID_REQUIRED));

    const isUUIDValid = await UUIDvalidation.isValid({ uuid: data.id });

    if (!isUUIDValid) return left(new Error(langErrors.UUID_INVALID));

    if (data.start) {
      const isStartValid = await startDateValidation.isValid({
        start: data.start,
      });

      if (!isStartValid)
        return left(new Error(`${langErrors.DATE_INVALID} para start`));

      start = parseToDateTime(data.start, 0);
    } else {
      start = startOfDay(new Date());
    }

    if (data.finish) {
      const isFinishValid = await finishDateValidation.isValid({
        finish: data.finish,
      });

      if (!isFinishValid)
        return left(new Error(`${langErrors.DATE_INVALID} para finish`));

      finish = parseToDateTime(data.finish, 59);
    } else {
      finish = endOfDay(new Date());
    }

    const customer = await getCustomerByUUID(data.id as UUID);

    if (!customer) return left(new Error(langErrors.CUSTOMER_NOT_FOUND));

    const alerts = await getAlertLogsByCustomer(data.id as UUID, start, finish);

    if (alerts.length === 0) return left(new Error(langErrors.ALERT_NOT_FOUND));

    if (!alerts) return left(new Error(langErrors.ALERT_ERROR_NOT_FOUND));

    return right(alerts);
  } catch (error) {
    return left(new Error(langErrors.GENERAL_ERROR));
  }
};
