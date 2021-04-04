import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Router from './Router';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <>
      {loading && (
        <Spin tip="Loading" indicator={<LoadingOutlined />}>
          <Router />
        </Spin>
      )}

      {!loading && <Router />}
    </>
  );
}

export default App;
