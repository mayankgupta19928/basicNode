import express from "express";

import {
  handleApiUserGet,
  handleApiUserIdDelete,
  handleApiUserIdGet,
  handleApiUserIdPatch,
  handleApiUserPost,
  handlerGetUser,
} from "./controller/user";
import { handleApiLoginPost, signUpHandler } from "./controller/auth/login";
const router = express();
router.route("/user").get(handlerGetUser);

router.route("/api/user").get(handleApiUserGet).post(handleApiUserPost);

router.route("/login").post(handleApiLoginPost);
router.route("/signup").post(signUpHandler);

router
  .route("/api/user/:id")
  .get(handleApiUserIdGet)
  .patch(handleApiUserIdPatch)
  .delete(handleApiUserIdDelete);

export { router };
