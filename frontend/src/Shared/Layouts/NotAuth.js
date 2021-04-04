import React from 'react';
import { Row, Col } from 'antd';
import Config from 'Config';

export const NotAuthLayout = ({ component: Component, ...rest }) => {
  return (
    <Row className="not_auth_layout">
      <Col span={14} className="not_auth_layout--left">
        <Component {...rest} />
      </Col>
      <Col span={10}>
        <img
          className="not_auth_layout--right"
          src={`${Config.publicUrl}/images/NotAuthLayout/not-auth-one.jpg`}
          height="400"
          width="400"
          alt="not-auth"
        />
      </Col>
    </Row>
  );
};
