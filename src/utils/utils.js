// utils.js

/**
 * Function to calculate the overall rating based on resume score and text score
 * @param {number} resumeScore - The rating from the resume (out of 100)
 * @param {number} textScore - The rating from the text input (out of 100)
 * @param {Array<string>} strengths - An array of the applicant's strengths
 * @returns {Object} - An object with overallRating and top 3 strengths
 */
export const calculateOverallRating = (resumeScore, textScore, strengths) => {
  // Adjust weights for resume and text scores based on importance
  const resumeWeight = 0.6;
  const textWeight = 0.4;

  // Calculate the weighted overall rating
  const overallRating = resumeScore * resumeWeight + textScore * textWeight;

  // Sort strengths in descending order of relevance (example: if strengths are ordered in importance)
  const topStrengths = strengths.slice(0, 3); // Just take the top 3 strengths

  // Return the overall rating and top 3 strengths
  return {
    overallRating: parseFloat(overallRating.toFixed(2)), // Return rating with 2 decimal precision
    topStrengths,
  };
};
