import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../api';

interface Job {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  endDate: string;
}

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to Cuvette Job Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/post-job"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
        >
          <h2 className="text-xl font-bold mb-2">Create Interview</h2>
          <p className="text-gray-600">Post a new job opening and find the perfect candidate.</p>
        </Link>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Job Postings</h2>
          {jobs.length > 0 ? (
            <ul>
              {jobs.map((job) => (
                <li key={job._id} className="mb-4">
                  <h3 className="font-semibold">{job.jobTitle}</h3>
                  <p className="text-sm text-gray-600">Experience: {job.experienceLevel}</p>
                  <p className="text-sm text-gray-600">End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You haven't posted any jobs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;