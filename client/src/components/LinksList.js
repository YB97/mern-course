import React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

export const LinksList = ({ links }) => {
  if (!links.length) return <p>No links</p>;

  const columns = [
    {
      title: "Original link",
      dataIndex: "from",
      key: "original",
      width: 400
    },
    {
      title: "Shortened link",
      dataIndex: "to",
      key: "short"
    },
    {
      title: "Number of clicks",
      dataIndex: "clicks",
      key: "clicks"
    },
    {
      title: "Details",
      key: "open",
      render: (text, record) => <Link to={`/detail/${record.key}`}>Open</Link>
    }
  ];

  const data = links.map(link => ({
    key: link._id,
    from: link.from,
    to: link.to,
    clicks: link.clicks
  }));

  return <Table columns={columns} dataSource={data} style={{ padding: 30 }} />;
};
