import React from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not_found_container">
      <h1>404</h1>
      <p>{t('GENERAL.PAGENOTFOUND')}</p>
      <Link to="/">
        <Button icon={<LeftOutlined />}>{t('GENERAL.GOTOHOMEPAGE')}</Button>
      </Link>
    </div>
  );
}
