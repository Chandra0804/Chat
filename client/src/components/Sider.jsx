import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faStar,
  faChartBar,
  faUser,
  faBell
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ setComponentItem }) => {
  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-4 rounded-lg m-1 ">
      <div className="w-10 h-10 bg-blue-500 my-2 flex items-center justify-center rounded-lg" onClick={()=>{
        setComponentItem("ChatWindow")
      }}>
        <FontAwesomeIcon icon={faCommentDots} className="text-white" />
      </div>
      <div className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg" onClick={()=>{
        setComponentItem("Friends")
      }}>
        <FontAwesomeIcon icon={faStar} className="text-white" />
      </div>
      <div
        className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg"
        onClick={() => {
          setComponentItem("Explore");
        }}
      >
        <FontAwesomeIcon icon={faUser} className="text-white" />
      </div>
      <div
        className="w-10 h-10 bg-gray-700 my-2 flex items-center justify-center rounded-lg"
        onClick={() => {
          setComponentItem("Requests");
        }}
      >
        <FontAwesomeIcon icon={faBell} className="text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
