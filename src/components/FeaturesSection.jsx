import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "AI-powered Chatbot",
      description:
        "Track your coding progress and receive feedback on your improvement areas.",
    },
    {
      title: "AI Code Editor",
      description:
        "Practice and review code with AI-enhanced suggestions and improvements.",
    },
    {
      title: "Interview Scheduling",
      description:
        "Seamlessly schedule technical interviews and practice sessions.",
    },
    {
      title: "Ranking Management",
      description:
        "Manage and compare your ranks across multiple coding platforms.",
    },
    {
      title: "Employer Services",
      description:
        "Employers can shortlist candidates based on rankings and take integrated interviews.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-4 text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
