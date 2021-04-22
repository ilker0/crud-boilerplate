import React from 'react';
import { Input, Button, Row, Col, Form, Select } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage, defaultLanguage } from 'Shared/Utils';
import { useSelector } from 'react-redux';

function LoginPage() {
  const { t, i18n } = useTranslation();
  const LoginState = useSelector((state) => {
    const {
      AuthReducer: { LoginReducer },
    } = state;
    return LoginReducer;
  });

  const onSubmit = (values) => {
    console.log('Success:', values);
    console.log(LoginState);
  };

  const handleLanguage = (val) => {
    changeLanguage(val, i18n);
  };

  return (
    <Form
      layout="vertical"
      name="login"
      className="flex items-center justify-center login_page-container"
      onFinish={onSubmit}
      initialValues={{ language: defaultLanguage() }}
    >
      <Row>
        <Col span={24}>
          <h1>{t('AUTH.WELCOMETO')}</h1>
        </Col>

        <Col span={24}>
          <Form.Item
            label={t('AUTH.USERNAME')}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
        </Col>
        <Col span={24} className="u-m-t-1">
          <Form.Item
            label={t('AUTH.PASSWORD')}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<KeyOutlined />} />
          </Form.Item>
        </Col>
        <Col span={24} className="u-m-t-1">
          <Form.Item label={t('AUTH.LANGUAGE')} name="language">
            <Select defaultValue="en" onChange={handleLanguage}>
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="tr">Türkçe</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} className="flex justify-end u-m-b-2">
          <Link to="/auth/reset-password"> {t('AUTH.FORGOTPASSWORD')}</Link>
        </Col>
        <Col span={24}>
          <Button
            loading={LoginState.loading}
            type="primary"
            className="w-100 u-m-t-1"
            htmlType="submit"
          >
            {t('AUTH.SIGNIN')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export { LoginPage };
