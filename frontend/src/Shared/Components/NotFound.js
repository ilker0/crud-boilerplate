import React from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="not_found_container">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">
        <Button icon={<LeftOutlined />}>Go to home page</Button>
      </Link>
    </div>
  );
}
