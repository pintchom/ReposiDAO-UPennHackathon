import React, { useState } from "react";
import axios from "axios";
import EmailBox from "./Components/EmailBox";

function App() {
  // state to keep track of successful git changes
  const [counter, setCounter] = useState(0);

  const refreshGitLog = () => {
    axios
      .get("http://127.0.0.1:5000/update-git-log")
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);
        alert("Git Log Updated Successfully!");
        // counter is increased by 1 everytime there is a successful git change
        setCounter((prevCounter) => prevCounter + 1);
      })
      .catch((error) => {
        // Handle any errors
        console.error("There was an error!", error);
        alert("Failed to update Git Log!");
      });
  };

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

  const [showEmailBox, setShowEmailBox] = useState(false);

  const toggleEmailBox = () => {
    setShowEmailBox(!showEmailBox);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={refreshGitLog}>Refresh</button>
        <h1>Successful Changes: {counter}</h1>
        <button onClick={requestAccount}>Connect MetaMask</button>
        <h3>Wallet Address: {walletAddress}</h3>
        <button onClick={toggleEmailBox}>Enter Your Email</button>
        {showEmailBox && <EmailBox />}
      </header>
    </div>
  );
  }

  export default App;