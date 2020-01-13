import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/Auth.Context";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  const pressHandler = async e => {
    try {
      const data = await request(
        "/api/link/generate",
        "POST",
        { from: link },
        { Authorization: `Bearer ${auth.token}` }
      );
      history.push(`/detail/${data.link._id}`);
    } catch (e) {}
  };

  return (
    <Row>
      <Col span={12} offset={6} style={{ paddingTop: 20 }}>
        <Title level={4}>Link Shorter</Title>
        <Input
          placeholder="Paste your link"
          id="link"
          value={link}
          onChange={e => setLink(e.target.value)}
          onPressEnter={pressHandler}
        />
      </Col>
    </Row>
  );
};
