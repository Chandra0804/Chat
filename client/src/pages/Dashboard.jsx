import React from "react";
import { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sider";
import socket from "../socket";
import ExploreFriends from "../components/ExploreFriends";
import axios from "axios";
import Requests from "../components/Requests";
import MyFriends from "../components/MyFriends";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [component, setComponent] = useState("ChatWindow");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get("http://localhost:3000/api/dashboard", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status !== 200) window.location.href = "/login";
        })
        .catch((error) => {
          console.log("Error fetching dashboard:", error);
        });
    }
    socket.on("initialMessages", (initialMessages) => {
      setMessages(initialMessages);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("initialMessages");
      socket.off("message");
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  const setComponentItem = (component) => {
    setComponent(component);
  };

  const renderComponent = (component) => {
    if (component == "ChatWindow")
      return <ChatWindow messages={messages} sendMessage={sendMessage} />;
    else if (component == "Explore") return <ExploreFriends />;
    else if (component == "Requests") return <Requests/>
    else if(component == "Friends") return <MyFriends/>
  };
  return (
    <div className="flex h-screen">
      <Sidebar setComponentItem={setComponentItem} />

      {renderComponent(component)}
    </div>
  );
}
