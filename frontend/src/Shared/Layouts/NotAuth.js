import React from 'react';
import { Row, Col } from 'antd';
import Config from 'Config';

export const NotAuthLayout = ({ component: Component, ...rest }) => {
  return (
    <Row className="not_auth_layout">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={12}
        className="not_auth_layout--left"
      >
        <Component {...rest} />
      </Col>
      <Col xs={0} sm={0} md={0} lg={0} xl={12}>
        <img
          className="not_auth_layout--right"
          src={`${Config.publicUrl}/images/NotAuthLayout/not-auth-one.jpg`}
          alt="not-auth"
        />
      </Col>
    </Row>
  );
};
