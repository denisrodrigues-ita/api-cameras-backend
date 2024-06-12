import { Express } from "express-serve-static-core";
import {
  getAlertLogsByCustomerController,
  postAlertLogController,
} from "../controllers/alertLogs.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const camerasRouter = (app: Express) => {
  app.post("/alerts", authenticateToken, postAlertLogController);
  app.get("/alerts/bycustomer/:id", authenticateToken, getAlertLogsByCustomerController);
};

export default camerasRouter;
