import { useCallback } from "react";
import { message } from "antd";

export const useMessage = () => {
  return useCallback((text, type) => {
    if (text) {
      console.log("text", text);
      message[type || "info"](text);
    }
  }, []);
};
