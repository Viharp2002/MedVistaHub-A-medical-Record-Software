import React, { useEffect, useState } from 'react';
import "../styles/chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [getChat,setGetChat] = useState([]);

  const handleMessageSend = async() => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue(""); // Clear input field
    }
    const message = inputValue;
    const person = "Doctor";
    const res = await fetch('http://localhost:3605/storeChat',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message,person})
    })

    await res.json();

    if (res.status===201) {
        alert("done");
    } else {
        alert("not done");
    }
  };

  useEffect(()=>{
      const handleGetMessage = async()=>{
        try {
            const res = await fetch('http://localhost:3605/getChat/', {
              method: 'GET',
          })
          const data = await res.json();
    
          if (res.status===201) {
            setGetChat(data);
          } else {
            alert("not");
          }
        } catch (error) {
            console.log(error);
        }
      } ;
      
      handleGetMessage();
    },[])
    return (
    <div className="chat-container">
      <div className="chat-box">
      <div className="chat-message received">
      Messages are end-to-end encrypted
      </div>
        {getChat.map((messagee, index) => (

          <div key={index} className="chat-message sent">{`You: ${messagee.message}`}</div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input
          type="text"
          value={inputValue}
          name="messageInp" id="messageInp"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" onClick={handleMessageSend} id="send-button">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
