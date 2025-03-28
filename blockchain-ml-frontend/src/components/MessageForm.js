import { useState } from "react";
import axios from "axios";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const checkMessage = async () => {
    try {
      const res = await axios.post("/api/check-message", { message });
      setStatus(res.data.result);
    } catch (error) {
      console.error(error);
      alert("Error processing message!");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">Check Message</h2>
      <textarea className="p-2 border" placeholder="Enter Message" onChange={(e) => setMessage(e.target.value)}></textarea>
      <button className="p-2 bg-blue-500 text-white" onClick={checkMessage}>Check</button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default MessageForm;
