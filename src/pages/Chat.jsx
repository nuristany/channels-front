import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessages } from "../hooks/useMessages";
import { useConversation } from "../hooks/useConversaton";
import useWebSocket from "react-use-websocket";
import useAuth from "../context/useAuth";


import "../Chat.css";

const Chat = () => {
  const { channelId } = useParams();
  const { authToken, user } = useAuth();

  // 1️⃣ STATE for the input message
  const [message, setMessage] = useState("");

  // 2️⃣ Fetch or create the conversation for this channel
  const {
    data: conv,
    isLoading: convoLoading,
    error: convoError,
  } = useConversation(channelId);
  const convId = conv?.id; // ← Now convId is declared after conv is available

  // 3️⃣ Fetch the messages for that conversation
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = useMessages(convId);    // ← Use convId here, after it's defined

  // 4️⃣ Local copy of messages so we can append new ones
  const [receivedMessages, setReceivedMessages] = useState([]);

  // 5️⃣ When the REST-fetched messages arrive, seed our local state
  useEffect(() => {
    if (messagesData) {
      setReceivedMessages(messagesData);
    }
  }, [messagesData]);

  // 6️⃣ Build the WebSocket URL (only once we have channelId & authToken)
  const isProduction = true;
  const socketUrl =
  authToken && channelId
    ? `${isProduction ? 'wss://channels-backend-production.up.railway.app' : 'ws://127.0.0.1:8000'}/ws/chat/${channelId}/?token=${authToken}`
    : null;
  // const socketUrl =
  //   authToken && channelId
  //     ? `wss://channels-backend-production.up.railway.app/ws/chat/${channelId}/?token=${authToken}`
  //     : null;

  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("✅ Connected"),
    onClose: () => console.log("⚠️ Closed!"),
    onError: () => console.log("❌ Error!"),
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "user_info") return;
      if (data.message) {
        setReceivedMessages((prev) => {
          if (prev.some((m) => m.id === data.message.id)) return prev;
          return [...prev, data.message];
        });
      }
    },
    shouldReconnect: () => !!socketUrl,
  });

  const sendMessage = () => {
    if (!message.trim()) return;
    sendJsonMessage({ message });
    setMessage("");
  };

  // 7️⃣ Handle loading / error states
  if (convoLoading || messagesLoading) {
    return <div className="chat-container"><p>Loading chat…</p></div>;
  }
  if (convoError || messagesError) {
    return <div className="chat-container"><p>Error loading chat.</p></div>;
  }

  // 8️⃣ Render
  return (
    <div className="chat-container">
      <h1 className="chat-header">Chat App</h1>

      <div className="message-container">
        {receivedMessages.map((msg, idx) => (
          <div className="message" key={msg.id ?? idx}>
            <div className="message-text">{msg.content}</div>
            <div className="message-username">
              From:{" "}
              {msg.sender?.first_name && msg.sender?.last_name
                ? `${msg.sender.first_name} ${msg.sender.last_name}`
                : msg.sender?.email || "Unknown"}
            </div>
            <div className="message-time">
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="status-container">
        <p>Status: {readyState === 1 ? "Connected" : "Disconnected"}</p>
      </div>

      <div className="input-container">
        <input
          className="message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type Your Message"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
