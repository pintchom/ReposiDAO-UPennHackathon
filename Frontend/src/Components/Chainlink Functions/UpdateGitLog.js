import React, { useState } from "react";
import { ethers } from "ethers";

const UpdateGitLog = () => {
  const [loading, setLoading] = useState(false);

  const updateGitLog = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any",
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // Assuming you have the ABI and address for the ReposiDAOFunctions contract
      const reposiDAOFunctionsABI =
        '[{"inputs":[{"internalType":"uint64","name":"functionsSubscriptionId","type":"uint64"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EmptySource","type":"error"},{"inputs":[],"name":"NoInlineSecrets","type":"error"},{"inputs":[],"name":"OnlyRouterCanFulfill","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"response","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"err","type":"bytes"}],"name":"Response","type":"event"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"err","type":"bytes"}],"name":"handleOracleFulfillment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastError","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRequestId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastResponse","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"requestData","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"requestIds","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"requests","outputs":[{"internalType":"bool","name":"fulfilled","type":"bool"},{"internalType":"bool","name":"exists","type":"bool"},{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"err","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"source","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"subscriptionId","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"}]'; // ABI for ReposiDAOFunctions contract
      const reposiDAOFunctionsAddress =
        "0xC6C54cEe7D12D2BAaa9442BC282b28beBFA85B86"; // Address of the deployed ReposiDAOFunctions contract

      const reposiDAOFunctions = new ethers.Contract(
        reposiDAOFunctionsAddress,
        reposiDAOFunctionsABI,
        signer,
      );

      // Call requestData function
      const tx = await reposiDAOFunctions.requestData();
      await tx.wait();

      console.log("Request sent successfully.");
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={updateGitLog} disabled={loading}>
      {loading ? "Updating..." : "Update Git Log"}
    </button>
  );
};

export default UpdateGitLog;
