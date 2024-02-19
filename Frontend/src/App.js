import React from "react";
import axios from "axios";

function App() {
  const refreshGitLog = () => {
    axios.get("http://127.0.0.1:5000/update-git-log").then((response) => {
      console.log(response.data);
      alert("Git Log Updated Successfully!");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={refreshGitLog}>Refresh</button>
      </header>
    </div>
  );
}

export default App;
