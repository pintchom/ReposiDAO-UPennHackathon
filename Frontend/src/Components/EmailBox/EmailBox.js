import React, { useState } from "react";
import "./EmailBox.css";

// Accept a prop named `onSubmit` which is a function passed from the parent component
const EmailBox = ({ onSubmit, public_key }) => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the payload
    const payload = {
      email: email,
      public_key: public_key, // Use the publicKey passed via props
    };

    // Make the POST request to the Flask endpoint
    try {
      const response = await fetch(
        "http://18.235.255.142/connect_wallet_login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Server response:", jsonResponse);
        // Call the onSubmit prop function, if additional actions are needed
        onSubmit(email);
        setEmail(""); // Reset the email state if needed
      } else {
        // Handle server errors (e.g., 4xx or 5xx error codes)
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
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
