import mongoose from 'mongoose';

const studentDetailsSchema = new mongoose.Schema({
  name: { type: String },
  enrollmentNumber: { type: String },
  applicationNumber: { type: Number },
  academicYear: { type: Number },
  programBranch: { type: String },
  dateOfJoining: { type: Date },
  dateOfBirth: { type: Date },
  gender: { type: String },
  presentMobileNumber: { type: Number },
  previousMobileNumber: { type: Number },
  emailId: { type: String },
  bloodGroup: { type: String },
  categoryOfAdmission: { type: String },
  nationality: { type: String },
  religion: { type: String },
  motherTongue: { type: String },
  maritalStatus: { type: String },
  domicileStatus: { type: String },
  adharCard: { type: Number },
  nameOnAdharCard: { type: String },
  officialCorrespondenceEmail: { type: String },
  officialCorrespondenceNumber: { type: Number },
  emergencyContactNumber: { type: Number },
  socialMediaAccount: { type: String },
  numberOfCreditsEarned: { type: Number }
}
);

const studentLoginSchema = new mongoose.Schema({
  emailId: { type: String, required: true, unique: true },
  password: { type: String },
});

studentLoginSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);
const StudentLogin = mongoose.model('StudentLogin', studentLoginSchema);

export { StudentDetails, StudentLogin };