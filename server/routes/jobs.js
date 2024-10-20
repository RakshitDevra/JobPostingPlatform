import express from 'express';
import Job from '../models/Job.js';
import { authMiddleware } from '../middleware/auth.js';
import { sendJobAlertEmail } from '../utils/email.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;
    const job = new Job({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
      company: req.userId
    });
    await job.save();
    // Send job alert emails to candidates
    // for (const candidateEmail of candidates) {
    //   await sendJobAlertEmail(candidateEmail, job);
    // }
    const emailPromises = candidates.map(candidateEmail => sendJobAlertEmail(candidateEmail, job));
    
    await Promise.all(emailPromises,()=>{
      console.log("Email sent");
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;