import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Tooltip, Table, Select, Dropdown, Menu } from 'antd';
import { ProductFilter } from 'Products/Components';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export function ProductList() {
  const { t } = useTranslation();

  const [isVisibleFilters, setisVisibleFilters] = useState(true);

  const handleFilterVisible = () => {
    setisVisibleFilters(!isVisibleFilters);
  };

  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const exportMenu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Excel file
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Csv file
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row>
      <Col span={5} className="flex justify-between items-center u-m-b-5">
        <h3 className="u-m-0">{t('GENERAL.PRODUCTS')}</h3>
      </Col>

      <Col span={24}>
        <Row>
          {isVisibleFilters && (
            <Col xs={24} sm={24} md={24} lg={10} xl={5}>
              <ProductFilter />
            </Col>
          )}

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={isVisibleFilters ? 14 : 20}
            xl={isVisibleFilters ? 19 : 24}
            className="b-white u-p-4 shadow-primary"
          >
            <div className="flex u-m-b-4 justify-between">
              <div>
                <Tooltip title={isVisibleFilters ? 'Gizle' : 'Göster'}>
                  <Button onClick={handleFilterVisible}>
                    Filtreler
                    {isVisibleFilters ? (
                      <MenuFoldOutlined />
                    ) : (
                      <MenuUnfoldOutlined />
                    )}
                  </Button>
                </Tooltip>
                <Dropdown
                  className="u-m-l-3"
                  overlay={exportMenu}
                  placement="bottomLeft"
                  arrow
                >
                  <Button>
                    <FileOutlined />
                    Export
                  </Button>
                </Dropdown>
                <Button className="u-m-l-3" type="primary">
                  <PlusOutlined />
                  New product
                </Button>
              </div>

              <Select style={{ width: 110 }} defaultValue="10">
                <Select.Option value="10">10 / Page</Select.Option>
                <Select.Option value="20">20 / Page</Select.Option>
                <Select.Option value="30">30 / Page</Select.Option>
                <Select.Option value="40">40 / Page</Select.Option>
                <Select.Option value="50">50 / Page</Select.Option>
              </Select>
            </div>
            <Table dataSource={data} rowSelection>
              <Table.Column title="Age" dataIndex="age" key="age" />
              <Table.Column title="Address" dataIndex="address" key="address" />
              <Table.Column title="Tags" dataIndex="tags" key="tags" />
              <Table.Column title="Action" key="action" />
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
