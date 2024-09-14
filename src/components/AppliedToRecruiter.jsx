import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const AppliedToRecruiter = () => {
  const [applications, setApplications] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const appliedJobsCollection = collection(db, 'appliedJobs');
      const appliedJobsSnapshot = await getDocs(appliedJobsCollection);
      
      const fetchedData = await Promise.all(appliedJobsSnapshot.docs.map(async (appliedJobDoc, index) => {
        const appliedJobData = appliedJobDoc.data();
        
        // Fetch student's name from "Application" collection
        const studentDoc = await getDoc(doc(db, 'Application', appliedJobData.studentId));
        const studentData = studentDoc.exists() ? studentDoc.data() : { name: 'Unknown' };
        
        // Fetch job title from "jobListing" collection
        const jobDoc = await getDoc(doc(db, 'jobListing', appliedJobData.jobId));
        const jobData = jobDoc.exists() ? jobDoc.data() : { title: 'Unknown' };
        
        return {
          srNo: index + 1,
          studentName: studentData.name,
          jobTitle: jobData.title,
          status: appliedJobData.status || 'pending', // Static status for now
        };
      }));
      
      setApplications(fetchedData);
    };

    fetchData();
  }, [db]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-red-100 text-red-600';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto px-4 py-6 flex justify-center">
      <table className="w-full max-w-3xl bg-white border border-gray-200 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-5 py-3 text-left text-base font-semibold text-gray-800">Sr No</th>
            <th className="px-5 py-3 text-left text-base font-semibold text-gray-800">Name of Student</th>
            <th className="px-5 py-3 text-left text-base font-semibold text-gray-800">Job Title</th>
            <th className="px-5 py-3 text-left text-base font-semibold text-gray-800">Status</th>
            <th className="px-5 py-3 text-left text-base font-semibold text-gray-800">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
              <td className="px-5 py-3 text-base text-gray-700">{app.srNo}</td>
              <td className="px-5 py-3 text-base text-gray-700">{app.studentName}</td>
              <td className="px-5 py-3 text-base text-gray-700">{app.jobTitle}</td>
              <td className="px-5 py-3 text-base">
                <span className={`px-3 py-1 rounded ${getStatusClass(app.status)}`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </td>
              <td className="px-5 py-3 text-base">
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition duration-150">
                  Schedule
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedToRecruiter;
