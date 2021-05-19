import React from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export function ProductTable({
  data,
  count,
  loading,
  handleTableChange,
  onUpdate,
  onDelete,
}) {
  const { t } = useTranslation();
  return (
    <Table
      pagination={{
        total: count,
        position: ['topRight'],
        showSizeChanger: true,
      }}
      loading={loading}
      dataSource={data}
      rowSelection
      onChange={handleTableChange}
      rowKey="id"
      scroll={{ x: 1200 }}
    >
      <Table.Column
        title={t('PRODUCT.MAINPHOTO')}
        dataIndex="mainPhoto"
        key="mainPhoto"
        render={(photo) => (
          <LazyLoadImage
            effect="black-and-white"
            height="100"
            width="100px"
            alt="example"
            style={{ objectFit: 'contain' }}
            src={photo}
            delayTime="0"
            placeholder={
              <div
                style={{
                  height: 100,
                  width: '100%',
                  backgroundColor: 'grey',
                }}
              />
            }
          />
        )}
      />
      <Table.Column
        title={t('GENERAL.CATEGORY')}
        dataIndex="category"
        key="category"
        render={(category) => category.name}
      />
      <Table.Column
        title={t('PRODUCT.PRODUCTNAME')}
        dataIndex="name"
        key="name"
        sorter
      />
      <Table.Column
        title={t('GENERAL.DESCRIPTION')}
        dataIndex="user"
        key="user"
      />
      <Table.Column
        title={t('PRODUCT.PRICE')}
        dataIndex="price"
        key="price"
        sorter
      />
      <Table.Column
        title={t('PRODUCT.PRICETYPE')}
        dataIndex="priceType"
        key="priceType"
        render={(type) => {
          if (type === 0) {
            return '₺';
          } else if (type === 1) {
            return '$';
          } else if (type === 2) {
            return '€';
          }
        }}
      />
      <Table.Column
        title={t('GENERAL.STATUS')}
        dataIndex="isActive"
        key="status"
        render={(status) =>
          status === 0 ? (
            <Tag color="red">{t('GENERAL.PASSIVE')}</Tag>
          ) : (
            <Tag color="green">{t('GENERAL.ACTIVE')}</Tag>
          )
        }
      />
      <Table.Column
        title={t('GENERAL.ADDINGUSER')}
        dataIndex="user"
        key="user"
      />
      <Table.Column
        title={t('GENERAL.CREATEDDATE')}
        dataIndex="createdAt"
        key="createdAt"
        sorter
        render={(date) => moment(date).format('YYYY/MM/DD')}
      />
      <Table.Column
        title={t('GENERAL.TRANSACTIONS')}
        dataIndex="transactions"
        key="transactions"
        render={(row, record) => (
          <Space size="middle">
            <Popconfirm
              placement="topLeft"
              title={t('GENERAL.AREYOUSURE')}
              onConfirm={() => onDelete(record.id)}
              okText={t('GENERAL.YES')}
              cancelText={t('GENERAL.NO')}
            >
              <a>{t('GENERAL.DELETE')}</a>
            </Popconfirm>
            <a onClick={() => onUpdate(record)}>{t('GENERAL.UPDATE')}</a>
          </Space>
        )}
      />
    </Table>
  );
}
