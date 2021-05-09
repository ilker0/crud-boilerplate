import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Form, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function CategoryFilter({ handleFilter }) {
  const { t } = useTranslation();

  const onSubmit = (values) => {
    handleFilter(values);
  };

  return (
    <div className="filters__wrapper">
      <h3 className="u-m-0">Filtreler</h3>

      <Form layout="vertical" onFinish={onSubmit} className="u-m-t-5">
        <Form.Item name="name" label={t('CATEGORY.CATEGORYNAME')}>
          <Input />
        </Form.Item>

        <Form.Item name="isActive" label={t('GENERAL.STATUS')}>
          <Select>
            <Select.Option value={1}>{t('GENERAL.ACTIVE')}</Select.Option>
            <Select.Option value={0}>{t('GENERAL.PASSIVE')}</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            <SearchOutlined />
            {t('GENERAL.SEARCH')}
          </Button>
        </div>
      </Form>
    </div>
  );
}
