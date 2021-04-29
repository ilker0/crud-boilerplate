import React from 'react';
import { Input, Button, Row, Col, Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { MailOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CallForgotPassword } from 'Auth/Actions/ForgotPasswordActions';

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ForgotPasswordState = useSelector((state) => {
    const {
      AuthReducer: { ForgotPasswordReducer },
    } = state;

    return ForgotPasswordReducer;
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(CallForgotPassword(values));
      notification.success({
        message: t('GENERAL.SUCCESSFUL'),
        description: t(`GENERAL.EMAILSENTSUCCESS`),
      });
    } catch (error) {
      notification.error({
        message: t('GENERAL.UNSUCCESSFUL'),
        description: t(`ERRORS.${error.message}`),
      });
    }
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
            rules={[
              { required: true, message: t('VALIDATIONS.PLEASEINPUTEMAIL') },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button
            loading={ForgotPasswordState.loading}
            type="primary"
            className="w-100 u-m-t-1"
            htmlType="submit"
          >
            {t('AUTH.SUBMIT')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export { ForgotPasswordPage };
