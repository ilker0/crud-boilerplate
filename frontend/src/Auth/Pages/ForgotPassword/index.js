import React from 'react';
import { Input, Button, Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { MailOutlined } from '@ant-design/icons';

function ForgotPasswordPage() {
  const { t } = useTranslation();

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
          <h1>{t('AUTH.FORGOTPASSWORD')}</h1>
        </Col>

        <Col span={24} className="u-m-t-1">
          <Form.Item
            label={t('AUTH.EMAIL')}
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button type="primary" className="w-100 u-m-t-1" htmlType="submit">
            {t('AUTH.SUBMIT')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export { ForgotPasswordPage };
