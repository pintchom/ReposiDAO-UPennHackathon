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

      const chainlinkFunctionsABI =
        '[{"inputs":[{"internalType":"address","name":"router","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EmptyArgs","type":"error"},{"inputs":[],"name":"EmptySecrets","type":"error"},{"inputs":[],"name":"EmptySource","type":"error"},{"inputs":[],"name":"NoInlineSecrets","type":"error"},{"inputs":[],"name":"OnlyRouterCanFulfill","type":"error"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"name":"UnexpectedRequestID","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"response","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"err","type":"bytes"}],"name":"Response","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"err","type":"bytes"}],"name":"handleOracleFulfillment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_lastError","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_lastRequestId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_lastResponse","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"source","type":"string"},{"internalType":"bytes","name":"encryptedSecretsUrls","type":"bytes"},{"internalType":"uint8","name":"donHostedSecretsSlotID","type":"uint8"},{"internalType":"uint64","name":"donHostedSecretsVersion","type":"uint64"},{"internalType":"string[]","name":"args","type":"string[]"},{"internalType":"bytes[]","name":"bytesArgs","type":"bytes[]"},{"internalType":"uint64","name":"subscriptionId","type":"uint64"},{"internalType":"uint32","name":"gasLimit","type":"uint32"},{"internalType":"bytes32","name":"donID","type":"bytes32"}],"name":"sendRequest","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"request","type":"bytes"},{"internalType":"uint64","name":"subscriptionId","type":"uint64"},{"internalType":"uint32","name":"gasLimit","type":"uint32"},{"internalType":"bytes32","name":"donID","type":"bytes32"}],"name":"sendRequestCBOR","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
      const chainlinkFunctionsAddress =
        "0x9cE1FAA24DA71AEA906756f6aC8dF9600Fe51FD8";

      const chainlinkFunctions = new ethers.Contract(
        chainlinkFunctionsAddress,
        chainlinkFunctionsABI,
        signer,
      );

      const sourceCode = `const response = await fetch("https://api.example.com/data", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      const data = await response.json();
      return data;`;

      console.log(ethers.utils.formatBytes32String("fun-ethereum-sepolia-1"));

      const source = "console.log('Hello, world!');";
      const encryptedSecretsUrls = "0x";
      const donHostedSecretsSlotID = 0;
      const donHostedSecretsVersion = 0;
      const args = [];
      const bytesArgs = [];
      const subscriptionId = 1; // or "1" if needed as a string
      const gasLimit = 3000000;
      const donID =
        "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000";

      const requestId = await chainlinkFunctions.sendRequest(
        source,
        encryptedSecretsUrls,
        donHostedSecretsSlotID,
        donHostedSecretsVersion,
        args,
        bytesArgs,
        subscriptionId,
        gasLimit,
        donID,
      );

      console.log("Git log update request sent. Request ID:", requestId);
    } catch (error) {
      console.error("Error sending git log update request:", error);
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
