import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  isVerified: { type: Boolean, default: true },
});

export default mongoose.model('User', userSchema);