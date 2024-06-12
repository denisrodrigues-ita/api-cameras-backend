import { Express } from "express-serve-static-core";
import {
  getCamerasByCustomerIdController,
  getCamerasController,
  patchCameraIsEnabledController,
  postCameraController,
} from "../controllers/cameras.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const camerasRouter = (app: Express) => {
  app.post("/cameras", authenticateToken, postCameraController);
  app.patch("/cameras/:id", authenticateToken, patchCameraIsEnabledController);
  app.get("/cameras/bycustomer/:customerId", authenticateToken, getCamerasByCustomerIdController);
  app.get("/cameras", authenticateToken, getCamerasController);
};

export default camerasRouter;
