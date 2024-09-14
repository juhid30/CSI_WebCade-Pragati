// utils.js

/**
 * Function to calculate the overall rating based on resume score and text score
 * @param {number} resumeScore - The rating from the resume (out of 10)
 * @param {number} textScore - The rating from the text input (out of 5)
 * @param {Array<string>} strengths - An array of the applicant's strengths
 * @returns {Object} - An object with overallRating and top 3 strengths
 */
export const calculateOverallRating = (resumeScore, textScore, strengths) => {
  // Validate inputs
  if (typeof resumeScore !== "number" || typeof textScore !== "number") {
    throw new Error("resumeScore and textScore must be numbers");
  }
  if (resumeScore < 0 || resumeScore > 10 || textScore < 0 || textScore > 5) {
    throw new Error(
      "resumeScore must be between 0 and 10, and textScore must be between 0 and 5"
    );
  }
  if (
    !Array.isArray(strengths) ||
    strengths.some((strength) => typeof strength !== "string")
  ) {
    throw new Error("strengths must be an array of strings");
  }

  // Adjust weights for resume and text scores based on importance
  const resumeWeight = 0.6;
  const textWeight = 0.4;

  // Normalize scores to 100 scale
  const normalizedResumeScore = resumeScore * 10; // Convert resumeScore from 0-10 to 0-100
  const normalizedTextScore = textScore * 20; // Convert textScore from 0-5 to 0-100

  // Calculate the weighted overall rating
  const overallRating =
    normalizedResumeScore * resumeWeight + normalizedTextScore * textWeight;

  // Sort strengths in descending order of relevance (example: if strengths are ordered in importance)
  const topStrengths = strengths.slice(0, 3); // Just take the top 3 strengths, handle case with fewer than 3

  console.log(overallRating, topStrengths);
  // Return the overall rating and top 3 strengths
  return {
    overallRating: parseFloat(overallRating.toFixed(2)), // Return rating with 2 decimal precision
    topStrengths:
      topStrengths.length > 0 ? topStrengths : ["No strengths provided"], // Handle empty array
  };
};
