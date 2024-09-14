import { useState } from "react";
import axios from "axios";

export default function DataCP() {
  const [username, setUsername] = useState("");
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [codeChefData, setCodeChefData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Fetch data from LeetCode API
      const leetCodeResponse = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      );

      // Fetch data from CodeChef API
      const codeChefResponse = await axios.get(
        `https://codechef-api.vercel.app/handle/${username}`
      );

      // Set the data into the state
      setLeetCodeData(leetCodeResponse.data);
      setCodeChefData(codeChefResponse.data);
      setLoading(false);
      console.log(leetCodeResponse.data);
      console.log(codeChefResponse.data);
    } catch (err) {
      setError(
        "Failed to fetch data. Please check the username and try again.",
        err
      );
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Coding Profile Stats</h2>

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
          <p>Username: {leetCodeData.username}</p>
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
          <p>Username: {codeChefData.username}</p>
          <p>Stars: {codeChefData.stars}</p>
          <p>Rating: {codeChefData.rating}</p>
          <p>Highest Rating: {codeChefData.highest_rating}</p>
          <p>Global Rank: {codeChefData.global_rank}</p>
          <p>Country Rank: {codeChefData.country_rank}</p>
        </div>
      )}
    </div>
  );
}
