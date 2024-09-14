import React from "react";

const EmployerSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Services for Employers</h2>
        <p className="text-lg mb-8">
          Leverage our platform to find the best coding talent. Use our
          integrated services to shortlist candidates based on rankings and
          conduct web-integrated interviews seamlessly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">Candidate Shortlisting</h3>
            <p className="mt-4 text-gray-700">
              Easily filter candidates based on their rankings and performance
              metrics.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold">
              Web-Integrated Interviews
            </h3>
            <p className="mt-4 text-gray-700">
              Conduct live coding interviews directly through our platform, with
              access to the candidate's progress and ranks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerSection;
