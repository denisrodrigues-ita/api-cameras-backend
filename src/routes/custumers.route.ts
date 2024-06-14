import { Express } from "express-serve-static-core";
import { postCustomersController } from "../controllers/customers.controller";

const customersRouter = (app: Express) => {
  app.post("/customers", postCustomersController);
};

export default customersRouter;
