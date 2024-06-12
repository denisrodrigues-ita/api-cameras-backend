import { Express } from "express-serve-static-core";
import {
  getCustomersController,
  postCustomersController,
} from "../controllers/customers.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const customersRouter = (app: Express) => {
  app.post("/customers", postCustomersController);
  app.get("/customers", authenticateToken, getCustomersController);
};

export default customersRouter;
