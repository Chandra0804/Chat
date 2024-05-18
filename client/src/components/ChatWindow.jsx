import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import { io } from "socket.io-client";
import axios from "axios";

// Get token from localStorage
const token = localStorage.getItem("token");

const socket = io("http://localhost:3000", {
  auth: {
    token: token,
  },
});

const ChatWindow = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    if (token) {
      const userId = JSON.parse(atob(token.split('.')[1])).userId;
      socket.emit('join', userId);
    }

    socket.on("message", (message) => {
      if (message.recipientId === recipientId || message.sender === recipientId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [recipientId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!recipientId) return;

      try {
        const response = await axios.get(`http://localhost:3000/api/messages/${recipientId}`, {
          headers: {
            authorization: token,
          },
        });
        setMessages(response.data.messages);
        setRecipient(response.data.recipient);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, [recipientId]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userId = JSON.parse(atob(token.split('.')[1])).userId;

      const message = {
        recipientId,
        message: input,
        sender: userId,
        timestamp: new Date(),
      };

      try {
        await axios.post("http://localhost:3000/api/send-message", message, {
          headers: {
            authorization: token,
          },
        });

        socket.emit("message", message);
        setInput("");
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  return (
    <>
      <ChatList setRecipientId={setRecipientId} />
      {recipientId === "" ? (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <h1 className="text-2xl text-gray-700">Select a chat to start messaging</h1>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-4 bg-blue-600 text-white font-bold shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-white" />
              </div>
              <span className="text-xl">{recipient.username}</span>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col bg-chat-window-pattern space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 max-w-xs rounded-lg shadow-md ${
                  msg.sender !== recipientId ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"
                }`}
              >
                <p>{msg.message}</p>
                <span className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex items-center bg-gray-50">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
