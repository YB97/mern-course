import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu } from "antd";

import { AuthContext } from "../context/Auth.Context";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [current, setCurrent] = useState("create");

  const logoutHandler = e => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  const handleClick = e => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={handleClick}
      style={{ textAlign: "center" }}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Menu.Item key="create">
        <NavLink to="/create">Create</NavLink>
      </Menu.Item>
      <Menu.Item key="links">
        <NavLink to="/links">Links</NavLink>
      </Menu.Item>
      <Menu.Item key="logout">
        <a href="/" onClick={logoutHandler}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );
};
