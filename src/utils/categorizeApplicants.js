/**
 * Classifies applicants based on their overall rating.
 * @param {Array<Object>} applicants - List of applicant objects with an `overallRating` property.
 * @returns {Object} - An object with categorized applicants.
 */
export const classifyApplicants = (applicants) => {
  const categorizedApplicants = {
    High: [],
    Medium: [],
    Low: [],
  };

  applicants.forEach((applicant) => {
    if (applicant.overallRating >= 80) {
      categorizedApplicants.High.push(applicant);
    } else if (applicant.overallRating >= 50) {
      categorizedApplicants.Medium.push(applicant);
    } else {
      categorizedApplicants.Low.push(applicant);
    }
  });

  return categorizedApplicants;
};
