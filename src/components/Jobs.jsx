/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path if necessary

const Modal = ({ isOpen, onClose, job }) => {
  const handleApply = async () => {
    const studentId = localStorage.getItem("studentDocId");
    const recruiterId = job.recruiterId; // Assuming the recruiter ID is stored in the job data

    console.log(studentId, job.id, recruiterId);
    if (!studentId || !job.id || !recruiterId) {
      console.error("Missing necessary information to apply for the job.");
      return;
    }

    const appliedJobData = {
      studentId,
      jobId: job.id,
      recruiterId,
      appliedAt: new Date(),
    };

    try {
      await addDoc(collection(db, "appliedJobs"), appliedJobData);
      alert("You have successfully applied for the job!");
    } catch (error) {
      console.error("Error applying for the job: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-4">
          {job.company} - {job.location}
        </p>
        <p>
          <strong>Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>Employment Type:</strong> {job.employmentType}
        </p>
        <p className="mt-4">
          <strong>Description:</strong> {job.description}
        </p>
        <p className="mt-4">
          <strong>Qualifications:</strong> {job.qualifications}
        </p>
        <p className="mt-4">
          <strong>Responsibilities:</strong> {job.responsibilities}
        </p>
        <p className="mt-4">
          <strong>Benefits:</strong> {job.benefits}
        </p>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Apply for this Job
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobListingCollection = collection(db, "jobListing");
      const jobSnapshot = await getDocs(jobListingCollection);
      const jobList = jobSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Recommended Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition bg-white relative"
            onClick={() => openModal(job)}
          >
            <p className="absolute top-2 left-2 bg-white text-gray-500 px-3 py-1 text-sm rounded-md shadow">
              {job.datePosted}
            </p>

            <div className="flex justify-between mt-8">
              <h2 className="text-xl font-semibold">{job.title}</h2>
            </div>
            <p className="text-gray-500 mb-2">{job.company}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {job.employmentType}
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {job.experience}
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {job.remote}
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {job.projectType}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-lg font-bold">{job.salary}</p>
              <p className="text-gray-500">{job.location}</p>
            </div>

            <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 absolute bottom-4 right-4">
              Details
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />
    </div>
  );
};

export default Jobs;
