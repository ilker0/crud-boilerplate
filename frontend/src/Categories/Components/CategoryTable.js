import React from 'react';
import { Table, Tag, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export function CategoryTable({ data, count, loading }) {
  const { t } = useTranslation();

  return (
    <Table
      pagination={{ total: count, position: ['bottomLeft'] }}
      loading={loading}
      dataSource={data}
      rowSelection
    >
      <Table.Column
        title={t('CATEGORY.CATEGORYNAME')}
        dataIndex="name"
        key="name"
        sorter
      />
      <Table.Column
        title={t('GENERAL.ADDINGUSER')}
        dataIndex="user"
        key="user"
        sorter
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
        render={() => (
          <Space size="middle">
            <a>{t('GENERAL.DELETE')}</a>
            <a>{t('GENERAL.UPDATE')}</a>
          </Space>
        )}
      />
    </Table>
  );
}
