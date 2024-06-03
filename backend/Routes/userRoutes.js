import express from 'express';

import protectRoute from '../Middleware/protectRoute.js';
import { getUserForSideBar } from '../Controllers/userController.js';

const router = express.Router();



router.get('/', protectRoute, getUserForSideBar);

export default router;