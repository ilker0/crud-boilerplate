import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Tooltip } from 'antd';
import { UsersFilter } from 'Users/Components';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export function UserList() {
  const { t } = useTranslation();

  const [isVisibleFilters, setisVisibleFilters] = useState(true);

  const handleFilterVisible = () => {
    setisVisibleFilters(!isVisibleFilters);
  };

  return (
    <Row>
      <Col span={5} className="flex justify-between items-center u-m-b-5">
        <h3 className="u-m-0">{t('GENERAL.USERS')}</h3>
      </Col>

      <Col span={24}>
        <Row gutter={18}>
          {isVisibleFilters && (
            <Col xs={24} sm={24} md={24} lg={10} xl={5}>
              <UsersFilter />
            </Col>
          )}

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={isVisibleFilters ? 14 : 24}
            xl={isVisibleFilters ? 19 : 24}
          >
            <Tooltip title={isVisibleFilters ? 'Gizle' : 'Göster'}>
              <Button onClick={handleFilterVisible}>
                Filtreler{' '}
                {isVisibleFilters ? (
                  <MenuFoldOutlined />
                ) : (
                  <MenuUnfoldOutlined />
                )}
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
