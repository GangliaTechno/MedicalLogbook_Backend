import { StudentDetails, StudentLogin } from '../models/student.js';
import { connectDB, closeDB } from '../config/db.js';
import nodemailer from 'nodemailer';
import Parent from '../models/parentdetails.js';
import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

const student = asyncHandler(async (req, res) => {

  console.log("Received data:", req.body);
  try {

    await connectDB();
    const newStudent = new StudentDetails(req.body);
    const savedStudent = await newStudent.save();
    console.log("saved data is: ", savedStudent)

    res.status(201).json({ message: 'savedStudent' });
  } catch (error) {
    console.error('Error saving student document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {

    await closeDB();
  }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shettytejas96@gmail.com',
    pass: 'ndhg gltd onks xuan',
  },
});


const studentmail = asyncHandler(async (req, res) => {
  const { emailId, applicationNumber, enrollmentNumber } = req.body;
  console.log('Received credentials:', emailId);
  const password = applicationNumber;
  try {
    const mailOptions = {
      from: 'shettytejas96@gmail.com',
      to: emailId,
      subject: 'Welcome to Your App',
      text: `Thank you for registering! Your login credentials:\n\nEmail: ${emailId}\nPassword: ${applicationNumber}\n\n Update the password with your enrollement number:- ${enrollmentNumber}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


    await connectDB();
    const newStudentLogin = new StudentLogin({ emailId, password });
    const savedStudentLogin = await newStudentLogin.save();
    console.log("successfully login data saved data is: ", savedStudentLogin)


    console.log("sent email is: ", emailId)

    res.status(200).json({ success: true, message: 'Student email sent successfully and also saved in the database' });
  } catch (error) {
    console.error('Error saving student details:', error);
    res.status(500).json({ success: false, message: 'Error saving student details' });
  }


});


const parent = asyncHandler(async (req, res) => {

  console.log("Received data:", req.body);
  try {
    // Connect to the MongoDB database
    await connectDB();

    const newParent = new Parent(req.body);

    const savedParent = await newParent.save();

    console.log("saved data is: ", savedParent)

    // Respond with the saved parent details
    res.status(201).json({ message: 'data saved' });
  } catch (error) {
    console.error("Error saving parent document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    await closeDB();
  }
});

const searchStudent = asyncHandler(async (req, res) => {
  const { name, enrollmentNumber, programBranch } = req.body;
  console.log("Received credentials:", { name, enrollmentNumber, programBranch });

  try {
    await connectDB();

    // Build the $or array dynamically based on the provided parameters
    const orConditions = [];
    if (name) orConditions.push({ name: { $regex: name, $options: 'i' } });
    if (enrollmentNumber) orConditions.push({ enrollmentNumber: Number(enrollmentNumber) });
    if (programBranch) orConditions.push({ programBranch: { $regex: programBranch, $options: 'i' } });

    if (orConditions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one search parameter",
      });
    }

    // Use the dynamically built $or array in the query
    const query = { $or: orConditions };

    console.log("Query:", query);

    // Find students that match any of the specified conditions
    const srhStudent = await StudentDetails.find(query);

    if (!srhStudent || srhStudent.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student found",
      studentData: srhStudent,
    });
  } catch (error) {
    console.error("Error searching student:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});




export { student, parent, studentmail, searchStudent }