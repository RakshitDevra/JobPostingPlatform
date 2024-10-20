import React from 'react';
import { useForm } from 'react-hook-form';
import { createJob } from '../api';
import { useNavigate } from 'react-router-dom';

type FormData = {
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  candidates: string;
  endDate: string;
};

const JobPosting: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await createJob({
        ...data,
        candidates: data.candidates.split(',').map(email => email.trim())
      });
      console.log(response.data);
      alert('Job posted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Job posting failed:', error);
      alert('Job posting failed. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Job Posting</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            {...register("jobTitle", { required: "Job title is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.jobTitle && <p className="mt-2 text-sm text-red-600">{errors.jobTitle.message}</p>}
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            rows={4}
            {...register("jobDescription", { required: "Job description is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
          {errors.jobDescription && <p className="mt-2 text-sm text-red-600">{errors.jobDescription.message}</p>}
        </div>

        <div>
          <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            id="experienceLevel"
            {...register("experienceLevel", { required: "Experience level is required" })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Select experience level</option>
            <option value="Entry">Entry</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior">Senior</option>
          </select>
          {errors.experienceLevel && <p className="mt-2 text-sm text-red-600">{errors.experienceLevel.message}</p>}
        </div>

        <div>
          <label htmlFor="candidates" className="block text-sm font-medium text-gray-700">
            Candidate Emails (comma-separated)
          </label>
          <input
            type="text"
            id="candidates"
            {...register("candidates", { required: "At least one candidate email is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.candidates && <p className="mt-2 text-sm text-red-600">{errors.candidates.message}</p>}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            {...register("endDate", { required: "End date is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.endDate && <p className="mt-2 text-sm text-red-600">{errors.endDate.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPosting;