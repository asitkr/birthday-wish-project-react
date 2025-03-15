import  express from 'express';
import { verifyAccessToken } from '../middleware/admin.auth.js';
import { adminLoginController, adminLogoutController, adminRegisterController } from '../controllers/admin.controller.js'

const router = express.Router();

router.route("/register").post(adminRegisterController);
router.route("/login").post(adminLoginController);
router.route("/logout").get(verifyAccessToken, adminLogoutController);

export default router;