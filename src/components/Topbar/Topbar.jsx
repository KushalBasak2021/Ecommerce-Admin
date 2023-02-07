import React from "react";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/apiCalls";
import "./Topbar.css";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
// import LanguageIcon from "@material-ui/icons/Language";
// import SettingsIcon from "@material-ui/icons/Settings";
// import { useSelector } from "react-redux";

const Topbar = () => {
  let dispatch = useDispatch();
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">shopadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <button
              style={{ padding: "2px 7px", cursor: "pointer" }}
              onClick={() => Logout(dispatch)}
            >
              logout
            </button>
          </div>
          <img
            src="https://avatars.githubusercontent.com/u/1486366?v=4"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
