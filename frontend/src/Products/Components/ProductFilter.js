import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Select, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function ProductFilter() {
  const { t } = useTranslation();

  return (
    <div className="filters__wrapper">
      <h3 className="u-m-0">Filtreler</h3>

      <Form layout="vertical" className="u-m-t-5">
        <Form.Item label={t('PRODUCT.PRODUCTNAME')}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label={t('PRODUCT.PRICE')}>
          <Input.Group compact className="filters-group">
            <Input placeholder="Min" />
            <Input placeholder="Max" />
          </Input.Group>
        </Form.Item>

        <Form.Item name="priceType" label={t('PRODUCT.PRICETYPE')}>
          <Select defaultValue="0" className="w-100">
            <Select.Option value="0">₺</Select.Option>
            <Select.Option value="1">$</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="isActive" label={t('GENERAL.STATUS')}>
          <Select allowClear>
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
