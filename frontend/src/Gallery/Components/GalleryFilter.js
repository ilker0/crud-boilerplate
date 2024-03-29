import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function GalleryFilter({ handleFilter }) {
  const { t } = useTranslation();

  const onSubmit = (values) => {
    handleFilter(values);
  };

  return (
    <div className="filters__wrapper">
      <h3 className="u-m-0">Filtreler</h3>

      <Form layout="vertical" onFinish={onSubmit} className="u-m-t-5">
        <Form.Item name="name" label={t('GALLERY.PHOTONAME')}>
          <Input />
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
