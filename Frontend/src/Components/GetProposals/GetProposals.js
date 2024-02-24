import React, { useState, useEffect } from "react";
import axios from "axios";
import Vote from "./Voting.js"; // Ensure this is the correct path
import "./GetProposals.css";

const GetProposals = ({ userAddress }) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(
          "http://18.235.255.142/fetch_all_proposals",
        );
        if (response.status === 200) {
          setProposals(response.data);
        } else {
          console.error("Failed to fetch proposals:", response.status);
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="GetProposals-container">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="proposal">
          <p>
            <strong>Description:</strong> {proposal.description}
          </p>
          <p>
            <strong>Votes For:</strong> {proposal.votesFor / 10 ** 20} |{" "}
            <strong>Votes Against:</strong> {proposal.votesAgainst / 10 ** 20}
          </p>
          <Vote proposalId={proposal.id} userAddress={userAddress} />
        </div>
      ))}
    </div>
  );
};

export default GetProposals;
