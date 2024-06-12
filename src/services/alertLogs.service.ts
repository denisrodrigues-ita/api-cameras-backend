import { getCameraByUUID } from "../repositories/cameras.repository";
import { startOfDay, endOfDay } from "date-fns";
import { UUID } from "crypto";
import {
  AlertLogGetProps,
  AlertLogPostProps,
} from "../validations/alertLogs.validation";
import {
  createAlertLog,
  getAlertLogsByCustomer,
} from "../repositories/alertLogs.repository";
import { parseToDateTime } from "../utils/parseToDateTime";
import { getCustomerByUUID } from "../repositories/customers.repository";

export const postAlertLogService = async (data: AlertLogPostProps) => {
  try {
    const camera = await getCameraByUUID(data.cameraId as UUID);

    if (!camera) {
      throw new Error("CAMERA_NOT_FOUND");
    }

    const result = await createAlertLog(data);

    return result;
  } catch (error: unknown) {
    throw error;
  }
};

export const getAlertLogsService = async (data: AlertLogGetProps) => {
  try {
    let start: Date | undefined;
    let finish: Date | undefined;
    let id = data.id;

    const isCustomer = await getCustomerByUUID(id as UUID);

    if (!isCustomer) {
      throw new Error("CUSTOMER_NOT_FOUND");
    }

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

    const result = await getAlertLogsByCustomer(id as UUID, start, finish);

    if (!result) {
      throw new Error("ALERT_LOGS_NOT_FOUND");
    }

    return result;
  } catch (error: unknown) {
    throw error;
  }
};
