import { Express } from "express-serve-static-core";
import camerasRouter from "./cameras.route";
import alertLogsRouter from "./alertLogs.route";
import customersRouter from "./custumers.route";
import authRouter from "./auth.route";

const routes = (app: Express) => {
  camerasRouter(app);
  alertLogsRouter(app);
  customersRouter(app);
  authRouter(app);
};

export default routes;
