import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./WidgetSm.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const WidgetSm = () => {
  const adminUser = useSelector((state) => state.adminUser.currentUser);
  const [users, setUsers] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-tf4t.onrender.com/api/users/?new=true",
          {
            headers: {
              token: "Bearer " + adminUser.accessToken,
            },
          }
        );
        setUsers(res.data);
      } catch (err) {
        if (err.response.status === 403) {
          Logout(dispatch);
        }
      }
    };
    getUsers();
  }, [adminUser.accessToken, dispatch]);

  console.log(users);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.email}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
