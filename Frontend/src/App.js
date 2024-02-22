import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

//Components:
import EmailBox from "./Components/EmailBox/EmailBox";
import WalletConnector from "./Components/Wallet Connector/WalletConnector";
import TokenomicInfo from "./Components/Tokenomic Info/TokenomicInfo";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import OutgoingTokens from "./Components/Outgoing Tokens/OutgoingTokens"; // Adjust the import path as necessary

//Functions:
import { exchangeTokensForGoods } from "./Components/utils/blockchainstuff";
// import { fetchBalances, fetchCommitHistory } from "./utils/balances_stuff";

function App() {
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState("");
  const [walletData, setWalletData] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  // const [commitHistory, setCommitHistory] = useState([]);
  // const [balances, setBalances] = useState([]);

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
    const parentWalletXYZ = "0x76a89dBd709835b9D1A3D60eE31f9e6C54CC8ac6";
    exchangeTokensForGoods(tokenAmount, parentWalletXYZ);
  };

  // const loadBalances = async () => {
  //   const data = await fetchBalances();
  //   if (data) {
  //     setBalances(data); // Update the state with the fetched data
  //   }
  // };

  // const loadCommitHistory = async () => {
  //   const data = await fetchCommitHistory();
  //   if (data) {
  //     setCommitHistory(data); // Update the state with the fetched data
  //   }
  // };

  // useEffect(() => {
  //   loadBalances();
  //   loadCommitHistory();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <WalletConnector
          onSubmit={handleWalletSubmit}
          style={{
            marginRight: "1rem",
          }}
        />

        <EmailBox onSubmit={handleEmailSubmit} />
      </header>
      <main
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          padding: "1rem",
        }}
      >
        <aside
          className="leaderboard-feed"
          style={{ flex: 1, marginRight: "1rem" }}
        >
          <Leaderboard />
        </aside>
        <section
          className="main-content"
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 1rem",
          }}
        >
          <h1>ReposiDAO</h1>
          <div className="tokenomic-info">
            <TokenomicInfo />
          </div>

          <div className="commit-history-feed" style={{ marginTop: "1rem" }}>
            <OutgoingTokens />
          </div>
        </section>
        <aside
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <button
            className="refresh-button"
            onClick={refreshGitLog}
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            Refresh
          </button>
        </aside>
      </main>
    </div>
  );
}

export default App;
