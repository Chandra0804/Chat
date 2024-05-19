import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faStar,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import ExploreFriends from "../components/ExploreFriends";
import Requests from "./Requests";
import MyFriends from "./MyFriends";

const Sidebar = ({ setComponentItem }) => {
  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-4 rounded-lg m-1">
      <div
        className="w-10 h-10 bg-blue-500 my-2 flex items-center justify-center rounded-lg cursor-pointer"
        onClick={() => {
          setComponentItem("ChatWindow");
        }}
      >
        <FontAwesomeIcon icon={faCommentDots} className="text-white" />
      </div>
      <div
        className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg cursor-pointer"
        onClick={() => {
          setComponentItem("Friends");
        }}
      >
        
        <Popover placement="left">
        <PopoverTrigger>
          <div className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg cursor-pointer">
          <FontAwesomeIcon icon={faStar} className="text-white" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          bg="gray.700"
          color="white"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#2d3748",
            width: "fit-content",
            borderRadius: "15px",
            margin: "6px",
            outline: "none",
          }}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader style={{ fontWeight: "bold", cursor: "default" }}>
            My Friends
          </PopoverHeader>
          <PopoverBody>
            <MyFriends/>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      </div>
      <Popover placement="left">
        <PopoverTrigger>
          <div className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg cursor-pointer">
            <FontAwesomeIcon icon={faUser} className="text-white" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          bg="gray.700"
          color="white"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#2d3748",
            width: "fit-content",
            borderRadius: "15px",
            margin: "6px",
            outline: "none",
          }}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader style={{ fontWeight: "bold", cursor: "default" }}>
            Explore Friends
          </PopoverHeader>
          <PopoverBody>
            <ExploreFriends />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <div
        className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg cursor-pointer"
        onClick={() => {
          setComponentItem("Requests");
        }}
      >
        <Popover placement="left">
          <PopoverTrigger>
            <div className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg cursor-pointer">
              <FontAwesomeIcon icon={faBell} className="text-white" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            bg="gray.700"
            color="white"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#2d3748",
              width: "fit-content",
              borderRadius: "15px",
              margin: "6px",
              outline: "none",
            }}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader style={{ fontWeight: "bold", cursor: "default" }}>
              Requests
            </PopoverHeader>
            <PopoverBody>
              <Requests />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
