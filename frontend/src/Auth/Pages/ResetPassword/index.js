import React, { useEffect } from 'react';
import { Input, Button, Row, Col, Form, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { CallResetTokenCheck } from 'Auth/Actions/ResetPasswordActions';

function ResetPasswordPage({ match }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ResetPasswordState = useSelector((state) => {
    const {
      AuthReducer: { ResetPasswordReducer },
    } = state;

    return ResetPasswordReducer;
  });

  useEffect(() => {
    const {
      params: { token },
    } = match;
    dispatch(CallResetTokenCheck(token));
  }, []);

  const onSubmit = (values) => {
    console.log('Success:', values);
  };

  return (
    <>
      {ResetPasswordState.checkLoading && (
        <div className="flex items-center justify-center u-m-t-5">
          <Spin />
        </div>
      )}
      {!ResetPasswordState.checkLoading && (
        <Form
          layout="vertical"
          name="login"
          className="flex items-center justify-center login_page-container"
          onFinish={onSubmit}
        >
          <Row>
            <Col span={24}>
              <h1>{t('AUTH.RESETPASSWORD')}</h1>
            </Col>

            <Col span={24} className="u-m-t-1">
              <Form.Item
                label={t('AUTH.PASSWORD')}
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24} className="u-m-t-1">
              <Form.Item
                label={t('AUTH.PASSWORDAGAIN')}
                name="passwordAgain"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password again!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Button
                loading={ResetPasswordState.loading}
                type="primary"
                className="w-100 u-m-t-1"
                htmlType="submit"
              >
                {t('AUTH.SUBMIT')}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export { ResetPasswordPage };
