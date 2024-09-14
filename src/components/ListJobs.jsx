import React, { useState } from "react";

const ListJobs = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    description: "",
    salary: "",
    qualifications: "",
    responsibilities: "",
    benefits: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Listing Submitted:", jobData);
    // You can now send `jobData` to your backend for further processing
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        List a Job Opportunity
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Employment Type
          </label>
          <select
            name="employmentType"
            value={jobData.employmentType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select...</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Job Description
          </label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Salary Range</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Required Qualifications
          </label>
          <textarea
            name="qualifications"
            value={jobData.qualifications}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Job Responsibilities
          </label>
          <textarea
            name="responsibilities"
            value={jobData.responsibilities}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Benefits</label>
          <textarea
            name="benefits"
            value={jobData.benefits}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Experience Level (e.g. 3-5 years)
          </label>
          <input
            type="text"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Job Listing
        </button>
      </form>
    </div>
  );
};

export default ListJobs;
