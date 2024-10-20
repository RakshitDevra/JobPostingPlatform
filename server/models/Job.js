import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  candidates: [{ type: String }],
  endDate: { type: Date, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Job', jobSchema);