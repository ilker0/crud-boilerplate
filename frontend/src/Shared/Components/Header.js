import React from 'react';
import { Select, Button, Tooltip, Modal } from 'antd';
import { changeLanguage, defaultLanguage } from 'Shared/Utils';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import HeaderMenu from './HeaderMenu';

export function Header() {
  const { i18n } = useTranslation();
  const history = useHistory();

  const handleLanguage = (val) => {
    changeLanguage(val, i18n);
  };

  const handleLogout = async () => {
    Modal.confirm({
      content: 'Çıkış yapmak istediğine emin misin ?',
      onOk() {
        localStorage.removeItem('userToken');
        setTimeout(() => {
          history.push('/');
        }, 1000);
      },
      onCancel() {},
    });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="u-p-0 u-m-0 header__logo">LOGO</h1>
          <div>
            <Select
              className="u-m-r-3"
              defaultValue={defaultLanguage}
              onChange={handleLanguage}
            >
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="tr">Türkçe</Select.Option>
            </Select>

            <Tooltip title="My profile">
              <Link to="/profile" className="u-m-r-3">
                <Button>
                  <UserOutlined />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip title="Settings">
              <Link to="/profile" className="u-m-r-3">
                <Button>
                  <SettingOutlined />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip title="Logout">
              <Button onClick={handleLogout} danger type="primary">
                <LogoutOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>

        <HeaderMenu />
      </div>
    </header>
  );
}
