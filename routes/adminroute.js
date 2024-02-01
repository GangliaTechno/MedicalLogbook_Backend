// adminRoutes.js
import express from 'express';
import { login } from '../controllers/admincontroller.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } finally {
    // No need to close the database connection here
  }
});

export default router;
