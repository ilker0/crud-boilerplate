import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function UserActionsFilter() {
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
        <p className="filters-title">Type</p>
        <Select defaultValue="1" className="w-100">
          <Select.Option value="1">Delete</Select.Option>
          <Select.Option value="2">Create</Select.Option>
        </Select>

        <p className="filters-title">User</p>
        <Select defaultValue="1" className="w-100">
          <Select.Option value="1">İlker Demir</Select.Option>
          <Select.Option value="2">Eren Demir</Select.Option>
        </Select>

        <p className="filters-title">Date</p>
        <DatePicker placeholder="" className="w-100" picker="month" />
      </div>
    </div>
  );
}
