import { Express } from "express-serve-static-core";
import {
  getCamerasByCustomerIdController,
  patchCameraIsEnabledController,
  postCameraController,
} from "../controllers/cameras.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const camerasRouter = (app: Express) => {
  app.post("/cameras", authenticateToken, postCameraController);
  app.patch("/cameras", authenticateToken, patchCameraIsEnabledController);
  app.get("/cameras/bycustomer/:customerId", authenticateToken, getCamerasByCustomerIdController);
};

export default camerasRouter;
