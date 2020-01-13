import React from "react";
import { Typography, Row, Col } from "antd";

export const LinkCard = ({ link }) => {
  const { Title, Text } = Typography; //ref="noopener noreferrer"

  return (
    <Row>
      <Col span={12} offset={4}>
        <Title level={4}>Link</Title>

        <Text>
          Your link:&nbsp;
          <a href={link.to} target="_blank" rel="noopener noreferrer">
            {link.to}
          </a>
        </Text>
        <br />
        <Text>
          From:&nbsp;
          <a href={link.from} target="_blank" rel="noopener noreferrer">
            {link.from}
          </a>
        </Text>
        <br />
        <Text>
          Number of clicks:&nbsp;
          <strong>{link.clicks}</strong>
        </Text>
        <br />
        <Text>
          Creation date:&nbsp;
          <strong>{new Date(link.date).toLocaleDateString()}</strong>
        </Text>
      </Col>
    </Row>
  );
};
