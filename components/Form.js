import React, { useState } from "react";
import Axios from 'axios';

function OptInForm() {
  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

 const handleSubmit = async (e) => {
    e.preventDefault;
    try{
      const data = await Axios.post('/api/send-email', {name:name,email:emailAddress,message:message})
      console.log(data)
    }catch (err) {
      console.log(JSON.stringify(err))
    }
    
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "80px" }}>
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          id="name"
          placeholder="Your name"
          required
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "80px",textAlign:"right" }}>
          Email
        </label>
        <input
          onChange={(e) => setEmailAddress(e.target.value)}
          value={emailAddress}
          type="email"
          id="email"
          placeholder="Your email"
          required
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "56px",verticalAlign:"top" }}>
          Message
        </label>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          id="message"
          cols="20"
          rows="5"
          placeholder="Leave a message"
        />
      </div>

      <div style={{textAlign:"center"}}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default OptInForm;
