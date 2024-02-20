import React, { useState } from "react";
import axios from "axios";
import EmailBox from "./Components/EmailBox";
import WalletConnector from "./Components/WalletConnector";

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

  const [email, setEmail] = useState('');
  const [walletData, setWalletData] = useState('');

  const handleEmailSubmit = async (emailData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/connect_wallet_login", { email: emailData });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  const handleWalletSubmit = async (walletData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/connect_wallet_login", { wallet: walletData });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting wallet data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={refreshGitLog}>Refresh</button>
        <h1>Successful Changes: {counter}</h1>
        < WalletConnector onSubmit={handleEmailSubmit} />
        < EmailBox onSubmit={handleWalletSubmit} /> 
      </header>
    </div>
  );
  }

  export default App;