import  express from 'express';
import { addUserController } from '../controllers/user.controller.js';
import { verifyAccessToken } from '../middleware/admin.auth.js';

const router = express.Router();

router.route("/add-user").post(verifyAccessToken, addUserController);

export default router;