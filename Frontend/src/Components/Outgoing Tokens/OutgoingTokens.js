import React, { useState, useEffect } from "react";
import { fetchCommitHistory } from "../utils/balances_stuff.js";

const OutgoingTokens = () => {
  const [commitHistory, setCommitHistory] = useState([]);

  const loadCommitHistory = async () => {
    const data = await fetchCommitHistory();
    if (data) {
      // Convert the object into an array of objects, including the timestamp
      const historyArray = Object.entries(data).map(([timestamp, details]) => ({
        timestamp,
        ...details,
      }));
      setCommitHistory(historyArray);
    }
  };

  useEffect(() => {
    loadCommitHistory();
  }, []);

  return (
    <div>
      <h2>Outgoing Tokens</h2>
      {commitHistory.length > 0 ? (
        commitHistory.map((entry, index) => (
          <div key={index}>
            <p>Timestamp: {entry.timestamp}</p>
            <p>Commit ID: {entry.commit_id}</p>
            <p>Email: {entry.email}</p>
            <p>Mint Amount: {entry.mint_amount}</p>
            <p>Public Key: {entry.public_key}</p>
          </div>
        ))
      ) : (
        <p>No Outgoing Tokens...</p>
      )}
    </div>
  );
};

export default OutgoingTokens;
