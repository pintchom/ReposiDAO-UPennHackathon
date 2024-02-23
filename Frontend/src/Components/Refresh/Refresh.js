// RefreshFeedButton.js
import React from "react";
import axios from "axios";
import "./Refresh.css"; // Make sure the path matches where you save your CSS file

const Refresh = ({ onRefresh }) => {
  const refreshGitLog = () => {
    axios
      .get("http://127.0.0.1:5000/update-git-log")
      .then((response) => {
        console.log(response.data);
        alert("Git Log Updated Successfully!");
        if (onRefresh) onRefresh();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Failed to update Git Log!");
      });
  };

  return (
    <button className="refresh-feed-button" onClick={refreshGitLog}>
      Refresh Feed
    </button>
  );
};

export default Refresh;
