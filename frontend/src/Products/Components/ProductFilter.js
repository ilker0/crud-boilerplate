import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function ProductFilter() {
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

        <p className="filters-title">Price</p>
        <Input.Group compact className="filters-group">
          <Input placeholder="Min" />
          <Input placeholder="Max" />
        </Input.Group>

        <p className="filters-title">Price Type</p>
        <Select defaultValue="0" className="w-100">
          <Select.Option value="0">₺</Select.Option>
          <Select.Option value="1">$</Select.Option>
        </Select>

        <p className="filters-title">Create Date</p>
        <DatePicker placeholder="" className="w-100" picker="month" />
      </div>
    </div>
  );
}
