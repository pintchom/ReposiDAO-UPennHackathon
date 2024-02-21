import React, { useState } from "react";
import axios from "axios";
import EmailBox from "./Components/EmailBox";
import WalletConnector from "./Components/WalletConnector";
import { exchangeTokensForGoods } from "./utils/blockchainstuff";
import { ethers } from "ethers";

function App() {
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState("");
  const [walletData, setWalletData] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const refreshGitLog = () => {
    axios
      .get("http://127.0.0.1:5000/update-git-log")
      .then((response) => {
        console.log(response.data);
        alert("Git Log Updated Successfully!");
        setCounter((prevCounter) => prevCounter + 1);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Failed to update Git Log!");
      });
  };

  const handleFormSubmit = async () => {
    try {
      const formData = {
        email: email,
        public_key: walletData, // Adjusted to match the API's expected format
      };
      console.log(JSON.stringify(formData));
      const response = await axios.post(
        "http://127.0.0.1:5000/connect_wallet_login",
        formData,
      );
      console.log(response.data);
      setApiResponse(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error submitting form data:", error);
      setApiResponse("Error submitting form data.");
    }
  };

  const handleEmailSubmit = (emailData) => {
    console.log(emailData);
    setEmail(emailData);
  };

  const handleWalletSubmit = (walletData) => {
    setWalletData(walletData);
  };

  const buyGoods = () => {
    const tokenAmount = ethers.utils.parseUnits("100", 18);
    const parentWalletXYZ = "0x76a89dBd709835b9D1A3D60eE31f9e6C54CC8ac6"; // Example address
    exchangeTokensForGoods(tokenAmount, parentWalletXYZ);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <button className="refresh-button" onClick={refreshGitLog}>
            Refresh Git Log
          </button>
          <div className="form-container">
            <EmailBox onSubmit={handleEmailSubmit} />
            {email && <p className="response">Email: {email}</p>}
            <WalletConnector onSubmit={handleWalletSubmit} />
            {walletData && <p className="response">Wallet PK: {walletData}</p>}
            <button className="submit-button" onClick={handleFormSubmit}>
              SUBMIT FORM
            </button>
          </div>
          {apiResponse && (
            <div className="api-response">
              <h3>API Response</h3>
              <p>{apiResponse}</p>
            </div>
          )}
          {/* Add the Buy 100 REPO Goods button here */}
          <button onClick={buyGoods}>Buy 100 REPO Goods</button>
        </div>
      </header>
    </div>
  );
}

export default App;
