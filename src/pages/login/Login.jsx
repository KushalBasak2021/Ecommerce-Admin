import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, isFetching } = useSelector((state) => state.adminUser);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="username"
          className="loginInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="loginButton"
          disabled={isFetching}
        >
          Login
        </button>
        {error && (
          <span
            style={{ color: "red", fontWeight: "bold", paddingTop: "10px" }}
          >
            Something went wrong
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
