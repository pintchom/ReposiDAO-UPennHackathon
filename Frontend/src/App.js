import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

//Components:
import EmailBox from "./Components/EmailBox/EmailBox";
import WalletConnector from "./Components/Wallet Connector/WalletConnector";
import TokenomicInfo from "./Components/Tokenomic Info/TokenomicInfo";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import OutgoingTokens from "./Components/Outgoing Tokens/OutgoingTokens"; // Adjust the import path as necessary
import SendProposal from "./Components/SendProposal/SendProposal.js";
import GetProposals from "./Components/GetProposals/GetProposals.js";
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

  const contract_abi =
    '[{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"CheckpointUnorderedInsertion","type":"error"},{"inputs":[],"name":"ECDSAInvalidSignature","type":"error"},{"inputs":[{"internalType":"uint256","name":"length","type":"uint256"}],"name":"ECDSAInvalidSignatureLength","type":"error"},{"inputs":[{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"ECDSAInvalidSignatureS","type":"error"},{"inputs":[{"internalType":"uint256","name":"increasedSupply","type":"uint256"},{"internalType":"uint256","name":"cap","type":"uint256"}],"name":"ERC20ExceededSafeSupply","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"ERC2612ExpiredSignature","type":"error"},{"inputs":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC2612InvalidSigner","type":"error"},{"inputs":[{"internalType":"uint256","name":"timepoint","type":"uint256"},{"internalType":"uint48","name":"clock","type":"uint48"}],"name":"ERC5805FutureLookup","type":"error"},{"inputs":[],"name":"ERC6372InconsistentClock","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"currentNonce","type":"uint256"}],"name":"InvalidAccountNonce","type":"error"},{"inputs":[],"name":"InvalidShortString","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"uint8","name":"bits","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SafeCastOverflowedUintDowncast","type":"error"},{"inputs":[{"internalType":"string","name":"str","type":"string"}],"name":"StringTooLong","type":"error"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"}],"name":"VotesExpiredSignature","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousVotes","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newVotes","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[],"name":"EIP712DomainChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CLOCK_MODE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint32","name":"pos","type":"uint32"}],"name":"checkpoints","outputs":[{"components":[{"internalType":"uint48","name":"_key","type":"uint48"},{"internalType":"uint208","name":"_value","type":"uint208"}],"internalType":"struct Checkpoints.Checkpoint208","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clock","outputs":[{"internalType":"uint48","name":"","type":"uint48"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eip712Domain","outputs":[{"internalType":"bytes1","name":"fields","type":"bytes1"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"verifyingContract","type":"address"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"uint256[]","name":"extensions","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timepoint","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timepoint","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"hasVoted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proposalCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"},{"internalType":"uint256","name":"votesFor","type":"uint256"},{"internalType":"uint256","name":"votesAgainst","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"description","type":"string"}],"name":"propose","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"},{"internalType":"bool","name":"support","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

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
      <header
        className="App-header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "1rem",
        }}
      >
        <div>
          <button
            className="refresh-button"
            onClick={refreshGitLog}
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <WalletConnector onSubmit={handleWalletSubmit} />
          <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
            <EmailBox onSubmit={handleEmailSubmit} />
          </div>
        </div>
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
          style={{
            flex: 1,
            marginRight: "1rem",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "20px", // Increased padding here
          }}
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
          <div
            className="commit-history-feed"
            style={{
              marginTop: "1rem",
              border: "2px solid black",
              borderRadius: "10px",
              padding: "20px", // Increased padding here
            }}
          >
            <OutgoingTokens />
          </div>
          <div
            className="send-proposal-section"
            style={{
              marginTop: "2rem", // Adjust spacing as needed
            }}
          >
            <SendProposal />
          </div>
        </section>
        <aside
          style={{
            flex: 1,
            marginLeft: "1rem",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <GetProposals />
        </aside>
      </main>
    </div>
  );
}

export default App;
