import React, { useState } from "react";

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
    <div>
      <h2>Enter Your Email:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email address"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmailBox;
