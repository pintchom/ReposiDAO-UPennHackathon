import React, { useState } from 'react';

const EmailBox = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of the email, such as sending it to a server or processing it further
    console.log('Email submitted:', email);
    // Clear the input field after submission
    setEmail('');
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
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default EmailBox;
