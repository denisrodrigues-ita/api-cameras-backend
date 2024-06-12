import { Express } from "express-serve-static-core";
import { postAuthController } from "../controllers/auth.controller";

const authRouter = (app: Express) => {
  app.post("/auth", postAuthController);
};

export default authRouter;
