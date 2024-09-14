import React, { useState } from "react";

// Example job data
const jobData = [
  {
    id: 1,
    title: "Senior UI/UX Designer",
    company: "Amazon",
    datePosted: "20 May, 2023",
    location: "San Francisco, CA",
    employmentType: "Part time",
    description: "Design and develop UI/UX for next-gen platforms.",
    salary: "$250/hr",
    qualifications: "5+ years of experience in UI/UX design",
    responsibilities: "Design, test, and deliver UI solutions",
    benefits: "Remote, Flexible hours",
    experience: "Senior level",
    remote: "Distant",
    projectType: "Project work",
    bgColor: "bg-orange-100",
    accentColor: "text-orange-500",
  },
  {
    id: 2,
    title: "Junior UI/UX Designer",
    company: "Google",
    datePosted: "4 Feb, 2023",
    location: "California, CA",
    employmentType: "Full time",
    description: "Collaborate with design teams to build user-centric solutions.",
    salary: "$150/hr",
    qualifications: "1-2 years of experience in design",
    responsibilities: "Work on small projects with guidance",
    benefits: "Health insurance, Flexible schedule",
    experience: "Junior level",
    remote: "Flexible schedule",
    projectType: "Project work",
    bgColor: "bg-teal-100",
    accentColor: "text-teal-500",
  },
  {
    id: 3,
    title: "Senior Motion Designer",
    company: "Dribbble",
    datePosted: "29 Jan, 2023",
    location: "New York, NY",
    employmentType: "Part time",
    description: "Design animations for creative projects.",
    salary: "$260/hr",
    qualifications: "4+ years in motion design",
    responsibilities: "Create dynamic visuals and animation",
    benefits: "Remote, Flexible hours",
    experience: "Senior level",
    remote: "Distant",
    projectType: "Shift work",
    bgColor: "bg-purple-100",
    accentColor: "text-purple-500",
  },
  // Add more jobs as needed
];

// Modal component
const Modal = ({ isOpen, onClose, job }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-4">{job.company} - {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Employment Type:</strong> {job.employmentType}</p>
        <p className="mt-4"><strong>Description:</strong> {job.description}</p>
        <p className="mt-4"><strong>Qualifications:</strong> {job.qualifications}</p>
        <p className="mt-4"><strong>Responsibilities:</strong> {job.responsibilities}</p>
        <p className="mt-4"><strong>Benefits:</strong> {job.benefits}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recommended Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobData.map((job) => (
          <div
            key={job.id}
            className={`border rounded-lg p-6 shadow-md cursor-pointer hover:shadow-lg transition relative ${job.bgColor}`}
            onClick={() => openModal(job)}
          >
            {/* Date */}
            <p className="absolute top-2 left-2 bg-white text-gray-500 px-3 py-1 text-sm rounded-md shadow">
              {job.datePosted}
            </p>

            {/* Company Name */}
            <div className="flex justify-between mt-8">
              <h2 className="text-xl font-semibold">{job.title}</h2>
            </div>
            <p className="text-gray-500 mb-2">{job.company}</p>

            {/* Tags for type */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{job.employmentType}</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{job.experience}</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{job.remote}</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{job.projectType}</span>
            </div>

            {/* Salary and Location */}
            <div className="mt-4">
              <p className={`text-lg font-bold ${job.accentColor}`}>{job.salary}</p>
              <p className="text-gray-500">{job.location}</p>
            </div>

            {/* Details button */}
            <button
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 absolute bottom-4 right-4"
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />
    </div>
  );
};

export default Jobs;
