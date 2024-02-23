import React, { useState } from "react";
import "./EmailBox.css";

// Accept a prop named `onSubmit` which is a function passed from the parent component
const EmailBox = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop function, passing the email value to the parent component
    onSubmit(email); // This line is changed to use the onSubmit prop
    console.log("Email submitted:", email);
    setEmail(""); // Optionally reset the email state here if needed
  };

  return (
    <div className="EmailBox">
      {" "}
      {/* Use the class name to style the container */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email to link to wallet."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmailBox;
