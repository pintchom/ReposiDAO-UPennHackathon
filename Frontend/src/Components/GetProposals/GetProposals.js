import React, { useEffect, useState } from "react";

const GetProposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Function to fetch proposals
    const fetchProposals = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/fetch_all_proposals",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProposals(data);
      } catch (error) {
        console.error("Could not fetch proposals:", error);
      }
    };

    fetchProposals();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Proposals</h2>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            <p>
              <strong>Description:</strong> {proposal.description}
            </p>
            <p>
              <strong>Votes For:</strong> {proposal.votesFor}
            </p>
            <p>
              <strong>Votes Against:</strong> {proposal.votesAgainst}
            </p>
            <p>
              <strong>Executed:</strong> {proposal.executed ? "Yes" : "No"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetProposals;
