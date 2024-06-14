import { getCameraByUUID } from "../repositories/cameras.repository";
import { startOfDay, endOfDay } from "date-fns";
import { UUID } from "crypto";
import {
  AlertLogGetProps,
  AlertLogPostProps,
  alertsNotFound,
  createAlertLogValidation,
  getAlertLogByCustomer,
} from "../validations/alertLogs.validation";
import {
  createAlertLog,
  getAlertLogsByCustomer,
} from "../repositories/alertLogs.repository";
import { parseToDateTime } from "../utils/parseToDateTime";
import { getCustomerByUUID } from "../repositories/customers.repository";
import { customerNotFoundValidation } from "../validations/commom.validation";
import { cameraNotFound } from "../validations/cameras.validation";

export const postAlertLogService = async (data: AlertLogPostProps) => {
  try {
    await createAlertLogValidation.validate(data);

    const camera = await getCameraByUUID(data.cameraId as UUID);

    await cameraNotFound.validate({ camera });

    const result = await createAlertLog(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};

export const getAlertLogsService = async (data: AlertLogGetProps) => {
  try {
    await getAlertLogByCustomer.validate(data);

    let start: Date | undefined;
    let finish: Date | undefined;
    let id = data.id;

    const customer = await getCustomerByUUID(id as UUID);

    await customerNotFoundValidation.validate({ customer });

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
