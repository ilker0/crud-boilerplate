import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  BarsOutlined,
  TagsOutlined,
  TeamOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function HeaderMenu({ responsive }) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="header-menu__responsive"
        style={{ opacity: responsive ? '1' : '0' }}
      >
        <Menu mode="vertical" className="container">
          <Menu.Item key="dashboard">
            <Link to="/">
              <HomeOutlined />
              {t('GENERAL.HOMEPAGE')}
            </Link>
          </Menu.Item>

          <Menu.Item key="categories">
            <Link to="/categories">
              <BarsOutlined />
              {t('GENERAL.CATEGORIES')}
            </Link>
          </Menu.Item>

          <Menu.Item key="products">
            <Link to="/products">
              <TagsOutlined />
              {t('GENERAL.PRODUCTS')}
            </Link>
          </Menu.Item>

          <Menu.Item key="users">
            <Link to="/user">
              <TeamOutlined />
              {t('GENERAL.USERS')}
            </Link>
          </Menu.Item>

          <Menu.Item key="roles">
            <Link to="/roles">
              <ApiOutlined />
              {t('GENERAL.ROLES')}
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <Menu mode="horizontal" className="header-menu">
        <Menu.Item key="dashboard">
          <Link to="/">
            <HomeOutlined />
            {t('GENERAL.HOMEPAGE')}
          </Link>
        </Menu.Item>

        <Menu.Item key="categories">
          <Link to="/categories">
            <BarsOutlined />
            {t('GENERAL.CATEGORIES')}
          </Link>
        </Menu.Item>

        <Menu.Item key="products">
          <Link to="/products">
            <TagsOutlined />
            {t('GENERAL.PRODUCTS')}
          </Link>
        </Menu.Item>

        <Menu.Item key="users">
          <Link to="/user">
            <TeamOutlined />
            {t('GENERAL.USERS')}
          </Link>
        </Menu.Item>

        <Menu.Item key="roles">
          <Link to="/roles">
            <ApiOutlined />
            {t('GENERAL.ROLES')}
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
