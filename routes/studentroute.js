import express from 'express';
import { student, studentmail, searchStudent, UpdateStudentDetails, DeleteStudentDetails } from '../controllers/studentcontroller.js';

const router = express.Router();
router.route("/student-details").post(student);
router.route("/send-mail").post(studentmail)
router.route("/search-student").post(searchStudent)
router.route("/updatestudent-details").patch(UpdateStudentDetails)
router.route("/deletestudent-details").delete(DeleteStudentDetails)

export default router;