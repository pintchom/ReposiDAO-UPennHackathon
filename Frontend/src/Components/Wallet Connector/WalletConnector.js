import React, { useState } from "react";
import './WalletConnector.css';

// Accept a prop named `onSubmit` which is a function passed from the parent component
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
        console.log("Detected MetaMask Wallet: ", accounts[0]);
        // Call the onSubmit prop function, passing the wallet address to the parent component
        onSubmit(accounts[0]); // This line is added
      } catch (error) {
        console.error("Failed to connect or user denied access to MetaMask.");
      }
    } else {
      console.error("No MetaMask Extension Found");
    }
  }

  return (
    <div className="WalletConnector">
      <button className="connect-wallet-button" onClick={requestAccount}>Connect MetaMask</button>
      <h3>Wallet Address: {walletAddress}</h3>
    </div>
  );
};

export default WalletConnector;
