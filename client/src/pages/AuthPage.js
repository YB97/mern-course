import React, { useEffect, useContext } from "react";
import { Row, Col, Typography, Form, Icon, Input, Button } from "antd";

import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/Auth.Context";

const AuthPage1 = ({ form }) => {
  const auth = useContext(AuthContext);
  const { getFieldDecorator } = form;
  const { Title } = Typography;
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error, "error");
    clearError();
  }, [error, message, clearError]);

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", {
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password")
      });
      message(data.message, "success");
    } catch (err) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password")
      });
      auth.login(data.token, data.userId);
    } catch (err) {}
  };

  return (
    <Row align="middle" justify="center" type="flex">
      <Col>
        <Form
          onSubmit={e => e.preventDefault()}
          style={{ width: 300, marginTop: 30 }}
        >
          <Form.Item>
            <Title level={2}>Auth Form</Title>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please fill email field!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please fill password field!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
              onClick={loginHandler}
            >
              Log in
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              htmlType="submit"
              className="login-form-button"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export const AuthPage = Form.create({ name: "normal_login" })(AuthPage1);
