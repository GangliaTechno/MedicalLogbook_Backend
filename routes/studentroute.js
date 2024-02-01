import express from 'express';
import { student, studentmail, searchStudent } from '../controllers/studentcontroller.js';

const router = express.Router();
router.route("/student-details").post(student);
router.route("/send-mail").post(studentmail)
router.route("/search-student").post(searchStudent);

export default router;