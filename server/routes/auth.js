import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendVerificationEmail } from '../utils/email.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phoneNumber, companyName } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword, phoneNumber, companyName });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    sendVerificationEmail(user.email, token);
    console.log(user.email,token);
    res.status(201).json({ message: 'User created. Please check your email for verification.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email before logging in' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// router.get('/verify/:token', async (req, res) => {
//   try {
//     const { userId } = jwt.verify(req.params.token, process.env.JWT_SECRET);
//     console.log(userId);
//     await User.findByIdAndUpdate(userId, { isVerified: true });
//     res.status(200).json({ message: 'Email verified successfully' });
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid or expired token' });
//   }
// });
router.get('/verify/:token', async (req, res) => {
try {
  // Verify the JWT token and extract the userId
  const { userId } = jwt.verify(req.params.token, process.env.JWT_SECRET);
  
  // Check if the user exists
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // If the user exists, update their verification status
  user.isVerified = true;
  await user.save();
  
  res.status(200).json({ message: 'Email verified successfully' });
} catch (error) {
  // Handle expired or invalid token
  res.status(400).json({ message: 'Invalid or expired token' });
}
});
export default router;