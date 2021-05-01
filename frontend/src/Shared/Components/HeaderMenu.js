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

export default function HeaderMenu() {
  return (
    <Menu mode="horizontal" className="header-menu">
      <Menu.Item key="dashboard">
        <Link to="/">
          <HomeOutlined />
          Dashboard
        </Link>
      </Menu.Item>

      <Menu.Item key="categories">
        <Link to="/categories">
          <BarsOutlined />
          Categories
        </Link>
      </Menu.Item>

      <Menu.Item key="products">
        <Link to="/products">
          <TagsOutlined />
          Products
        </Link>
      </Menu.Item>

      <Menu.Item key="users">
        <Link to="/user">
          <TeamOutlined />
          Users
        </Link>
      </Menu.Item>

      <Menu.Item key="roles">
        <Link to="/roles">
          <ApiOutlined />
          Roles
        </Link>
      </Menu.Item>
    </Menu>
  );
}
