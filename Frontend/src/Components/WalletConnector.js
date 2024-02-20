import React, { useState } from "react";

const WalletConnector = () => {

    const [walletAddress, setWalletAddress] = useState("");

    async function requestAccount() {
        console.log("Requesting Account...");
      
        if (window.ethereum && window.ethereum.isMetaMask) {
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
            console.log("Detected MetaMask Wallet.");
          } catch (error) {
            console.log("Failed to connect or user denied access to MetaMask.");
          }
        } else {
          console.log("No MetaMask Extension Found");
        }
      }

      return (
        <div className="WalletConnector">
            <button onClick={requestAccount}>Connect MetaMask Wallet</button>
            <h3>Wallet Address: {walletAddress}</h3>
        </div>
      );

};

export default WalletConnector;