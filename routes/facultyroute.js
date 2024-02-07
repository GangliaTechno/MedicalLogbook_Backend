import express from 'express';
import { faculty, facultymail, searchfaculty, UpdateFacultyDetails, DeleteFacultyDetails } from '../controllers/facultycontroller.js';



const router = express.Router();


router.route("/faculty-details").post(faculty);
router.route("/send-mail").post(facultymail);
router.route("/faculty-search").post(searchfaculty);
router.route("/updatefaculty").patch(UpdateFacultyDetails);
router.route("/deletefaculty").delete(DeleteFacultyDetails);



export default router;