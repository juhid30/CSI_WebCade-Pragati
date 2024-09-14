import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function DataCP() {
  const [username, setUsername] = useState("");
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [codeChefData, setCodeChefData] = useState(null);
  const [rating, setRating] = useState(0); // To store the calculated rating
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const calculateRating = (leetCodeData, codeChefData) => {
    let totalScore = 0;
    let totalWeight = 0;
    console.log(leetCodeData, codeChefData);

    // LeetCode score calculation
    if (leetCodeData && leetCodeData.totalSolved) {
      const { easySolved, mediumSolved, hardSolved } = leetCodeData;

      // Calculate LeetCode score based on problem difficulty
      const leetCodePoints = easySolved * 1 + mediumSolved * 2 + hardSolved * 3;
      const leetCodeMaxPoints = 100; // Let's assume max points for LeetCode score
      const leetCodeScore = Math.min(
        10,
        (leetCodePoints / leetCodeMaxPoints) * 10
      );

      totalScore += leetCodeScore * 0.5; // Weight 50% from LeetCode
      totalWeight += 0.5;
    }

    // CodeChef score calculation
    if (codeChefData && codeChefData.rating) {
      const { rating, stars, globalRank, countryRank } = codeChefData;
      console.log(rating, stars, globalRank, countryRank);

      // Normalize the rating on a scale of 0 to 10 (3000 is the highest rating on CodeChef)
      const codeChefRatingScore = Math.min(10, (rating / 3000) * 10);

      // Additional score for stars (let's give stars some weight, e.g., 1 star = 1 point)
      const codeChefStarsScore = Math.min(10, stars * 2); // Stars contribute more significantly, capping at 5 stars

      // Global rank score (inverse of rank, lower rank is better)
      const codeChefGlobalRankScore =
        globalRank > 0 ? Math.min(10, (100000 / globalRank) * 10) : 0;

      // Country rank score (inverse of rank, lower rank is better)
      const codeChefCountryRankScore =
        countryRank > 0 ? Math.min(10, (10000 / countryRank) * 10) : 0;

      // Average of the different CodeChef metrics
      const codeChefScore =
        (codeChefRatingScore +
          codeChefStarsScore +
          codeChefGlobalRankScore +
          codeChefCountryRankScore) /
        4;

      totalScore += codeChefScore * 0.5; // Weight 50% from CodeChef
      totalWeight += 0.5;
    }

    // If we have data from one or both platforms, calculate the final rating
    return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Fetch data from LeetCode API
      let leetCodeResponse;
      try {
        leetCodeResponse = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );
        setLeetCodeData(leetCodeResponse.data);
      } catch {
        setLeetCodeData(null); // If failed, set to null
      }

      // Fetch data from CodeChef API
      let codeChefResponse;
      try {
        codeChefResponse = await axios.get(
          `https://codechef-api.vercel.app/handle/${username}`
        );
        setCodeChefData(codeChefResponse.data);
      } catch {
        setCodeChefData(null); // If failed, set to null
      }

      // Calculate rating based on the available data
      const calculatedRating = calculateRating(
        leetCodeResponse?.data,
        codeChefResponse?.data
      );
      setRating(calculatedRating);
      setLoading(false);
    } catch (err) {
      setError(
        "Failed to fetch data. Please check the username and try again."
      );
      setLoading(false);
    }
  };

  // Algorithm to calculate the rating out of 10

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Coding Profile Stats & Rating</h2>

      {/* Input form for username */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block text-lg mb-2">Enter your username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="border border-gray-300 px-4 py-2 mb-2 rounded-md"
          placeholder="Enter username"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </form>

      {/* Display loading spinner */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display LeetCode data */}
      {leetCodeData && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">LeetCode Stats</h3>
          <p>Username: {leetCodeData.name}</p>
          <p>Total Solved: {leetCodeData.totalSolved}</p>
          <p>Easy: {leetCodeData.easySolved}</p>
          <p>Medium: {leetCodeData.mediumSolved}</p>
          <p>Hard: {leetCodeData.hardSolved}</p>
        </div>
      )}

      {/* Display CodeChef data */}
      {codeChefData && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">CodeChef Stats</h3>
          <p>Username: {codeChefData.name}</p>
          <p>Stars: {codeChefData.stars}</p>
          <p>Rating: {codeChefData.rating}</p>
          <p>Highest Rating: {codeChefData.highestRating}</p>
          <p>Current Rating: {codeChefData.currentRating}</p>
          <p>Global Rank: {codeChefData.globalRank}</p>
          <p>Country Rank: {codeChefData.countryRank}</p>
        </div>
      )}

      {/* Display the calculated rating */}
      {rating !== null && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your Coding Rating:</h3>
          <p className="mt-2 text-lg text-gray-800">Rating: {rating} / 10</p>
        </div>
      )}
    </div>
  );
}
