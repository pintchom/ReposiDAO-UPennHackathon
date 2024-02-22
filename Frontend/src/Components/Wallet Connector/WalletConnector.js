import React, { useState } from "react";
import "./WalletConnector.css";

const WalletConnector = ({ onSubmit }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  async function requestAccount() {
    console.log("Requesting Account...");

    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true); // Set the connected state to true
        console.log("Detected MetaMask Wallet: ", accounts[0]);
        // Call the onSubmit prop function, passing the wallet address to the parent component
        onSubmit(accounts[0]);
      } catch (error) {
        console.error("Failed to connect or user denied access to MetaMask.");
        setIsWalletConnected(false); // Optionally reset the connected state on error
      }
    } else {
      console.error("No MetaMask Extension Found");
      setIsWalletConnected(false); // Optionally reset the connected state if MetaMask is not found
    }
  }

  return (
    <div className="WalletConnector">
      <button className="connect-wallet-button" onClick={requestAccount}>
        {isWalletConnected ? "Wallet Connected" : "Connect MetaMask"}
      </button>
    </div>
  );
};

export default WalletConnector;
