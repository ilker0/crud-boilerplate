import React from 'react';
import { Input, Button, Row, Col, Form } from 'antd';

export function ResetPasswordPage() {
  const onSubmit = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      layout="vertical"
      name="login"
      className="flex items-center justify-center login_page-container"
      onFinish={onSubmit}
    >
      <Row>
        <Col span={24}>
          <h1>Reset Password</h1>
        </Col>

        <Col span={24} className="u-m-t-1">
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>

        <Col span={24} className="u-m-t-1">
          <Form.Item
            label="Password Again"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button type="primary" className="w-100 u-m-t-1" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
