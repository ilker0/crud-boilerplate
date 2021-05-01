import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function UsersFilter() {
  const { t } = useTranslation();

  return (
    <div className="filters__wrapper">
      <div className="flex items-center justify-between">
        <h3 className="u-m-0">Filtreler</h3>
        <Button type="primary">
          <SearchOutlined />
          {t('GENERAL.SEARCH')}
        </Button>
      </div>

      <div className="filters__content">
        <p className="filters-title">Name</p>
        <Input />

        <p className="filters-title">Surname</p>
        <Input />

        <p className="filters-title">Username</p>
        <Input />

        <p className="filters-title">Email</p>
        <Input />

        <p className="filters-title">Create Date</p>
        <DatePicker placeholder="" className="w-100" picker="month" />
      </div>
    </div>
  );
}
