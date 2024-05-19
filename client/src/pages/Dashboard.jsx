import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sider";
import socket from "../socket";
import axios from "axios";
import Requests from "../components/Requests";
import MyFriends from "../components/MyFriends";
import { ChakraProvider, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, Button } from "@chakra-ui/react";
import ExploreFriends from "../components/ExploreFriends";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [component, setComponent] = useState("ChatWindow");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get("https://chat-server-docker.onrender.com/api/dashboard", {
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

  return (
    <ChakraProvider>
      <div className="flex h-screen">
        <Sidebar setComponentItem={setComponentItem} />
        <ChatWindow messages={messages} sendMessage={sendMessage} />;
      </div>
    </ChakraProvider>
  );
}
