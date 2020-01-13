import React from "react";
import { Spin } from "antd";

export const Loader = () => (
  <div
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <Spin />
  </div>
);
