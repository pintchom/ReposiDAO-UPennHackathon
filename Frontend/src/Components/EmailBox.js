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
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '300px' }}>
      <h2>Enter your email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email address"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '3px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
};

export default EmailBox;
