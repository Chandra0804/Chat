import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async (message) => {
        const newMessages = [...messages, { sender: 'user', text: message }];
        setMessages(newMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:3000/api/chat', { message });
            setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input.trim());
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 bg-blue-600 text-white font-bold shadow-md">
                <span className="text-xl">ChatBot</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col bg-chat-window-pattern space-y-4">
                {messages.map((msg, index) => (
                    <div
                    key={index}
                    className={`${
                      msg.sender !== 'bot' ? "self-end" : "self-start"
                    } flex flex-col items-end`}
                  >
                    <p
                      className={`p-3 max-w-xs rounded-lg shadow-md ${
                        msg.sender !== 'bot'
                          ? "bg-blue-500 text-white self-end"
                          : "bg-gray-200 self-start"
                      }`}
                    >
                      {msg.text}
                    </p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t flex items-center bg-gray-50">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-2"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
