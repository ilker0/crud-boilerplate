import React, { useEffect, useState } from 'react';
import { Input, Button, Row, Col, Form, Spin, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  CallResetTokenCheck,
  CallResetPassword,
} from 'Auth/Actions/ResetPasswordActions';
import { LeftOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

function ResetPasswordPage({ match }) {
  const {
    params: { token },
  } = match;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ResetPasswordState = useSelector((state) => {
    const {
      AuthReducer: { ResetPasswordReducer },
    } = state;

    return ResetPasswordReducer;
  });

  const [status, setStatus] = useState(false);

  const tokenCheck = async () => {
    try {
      await dispatch(CallResetTokenCheck(token));
      setStatus(true);
    } catch {
      setStatus(false);
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      values.resetpass_token = token;
      await dispatch(CallResetPassword(values));
      notification.success({
        message: t('GENERAL.SUCCESSFUL'),
        description: t(`GENERAL.SUCCESSFUL`),
      });
      history.push('/auth');
    } catch (error) {
      notification.error({
        message: t('GENERAL.UNSUCCESSFUL'),
        description: t(`ERRORS.${error.message}`),
      });

      setStatus(false);
    }
  };

  return (
    <>
      {ResetPasswordState.checkLoading && (
        <div className="vh-100 flex items-center flex-column justify-center">
          <Spin />
        </div>
      )}

      {!ResetPasswordState.checkLoading && (
        <>
          {status && (
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
                      {
                        required: true,
                        message: t('VALIDATIONS.PLEASEINPUTPASSWORD'),
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>

                <Col span={24} className="u-m-t-1">
                  <Form.Item
                    label={t('AUTH.PASSWORDAGAIN')}
                    name="passwordagain"
                    rules={[
                      {
                        required: true,
                        message: t('VALIDATIONS.PLEASEINPUTPASSWORDAGAIN'),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(t('VALIDATIONS.PASSWORDSNOTMATCH')),
                          );
                        },
                      }),
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
          {!status && (
            <div className="vh-100 flex items-center flex-column justify-center">
              <h1>{t('GENERAL.ERROR')}</h1>
              <p>{t('GENERAL.INVALIDTRANSACTION')}</p>

              <Link to="/">
                <Button icon={<LeftOutlined />}>Go to home page</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}

export { ResetPasswordPage };
