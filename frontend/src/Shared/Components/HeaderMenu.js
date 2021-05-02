import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  BarsOutlined,
  TagsOutlined,
  TeamOutlined,
  ApiOutlined,
  PictureOutlined,
  NodeExpandOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function HeaderMenu({ responsive, routeKey }) {
  const { t } = useTranslation();

  const menuItems = (
    <>
      <Menu.Item key="homepage">
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

      <Menu.Item key="gallery">
        <Link to="/gallery">
          <PictureOutlined />
          {t('GENERAL.GALLERY')}
        </Link>
      </Menu.Item>

      <Menu.Item key="users">
        <Link to="/users">
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

      <Menu.Item key="user-actions">
        <Link to="/user-actions">
          <NodeExpandOutlined />
          {t('GENERAL.USERACTIONS')}
        </Link>
      </Menu.Item>
    </>
  );

  return (
    <>
      {responsive && (
        <div className="header-menu__responsive">
          <Menu selectedKeys={routeKey} mode="vertical">
            {menuItems}
          </Menu>
        </div>
      )}

      <Menu selectedKeys={routeKey} mode="horizontal" className="header-menu">
        {menuItems}
      </Menu>
    </>
  );
}
