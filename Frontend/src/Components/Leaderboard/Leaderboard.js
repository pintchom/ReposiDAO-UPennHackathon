import React, { useState, useEffect } from "react";
import { fetchBalances } from "../utils/balances_stuff.js";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true); // New state to manage loading status

  const loadBalances = async () => {
    try {
      const data = await fetchBalances();
      if (data) {
        // Convert the object into an array of objects
        const balancesArray = Object.entries(data).map(([wallet, amount]) => ({
          wallet,
          amount,
        }));
        setBalances(balancesArray);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch balances:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalances();
  }, []); // The empty array ensures this effect runs only once after initial render

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="Leaderboard-container">
      <h2>Leaderboard</h2>
      {balances.length > 0 ? (
        balances.map((balance, index) => (
          <div key={index} className="balance-item">
            <p>Wallet: {balance.wallet}</p>
            <p>Balance: {balance.amount}</p>
          </div>
        ))
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
};

export default Leaderboard;
