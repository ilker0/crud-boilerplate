import React from 'react';
import { Input, Button, Row, Col, Form, Select } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

export function LoginPage() {
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
          <h1>Sign In</h1>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
        </Col>
        <Col span={24} className="u-m-t-1">
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<KeyOutlined />} />
          </Form.Item>
        </Col>
        <Col span={24} className="u-m-t-1">
          <Form.Item label="Language" name="language">
            <Select defaultValue="en">
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="tr">Türkçe</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button type="primary" className="w-100 u-m-t-1" htmlType="submit">
            Sign In
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
