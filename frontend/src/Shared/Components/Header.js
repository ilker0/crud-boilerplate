import React, { useState } from 'react';
import { Select, Button, Tooltip, Modal } from 'antd';
import { changeLanguage, defaultLanguage } from 'Shared/Utils';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import HeaderMenu from './HeaderMenu';

export function Header() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [isVisibleResponsiveMenu, setIsVisibleResponsiveMenu] = useState(false);

  const handleLanguage = (val) => {
    changeLanguage(val, i18n);
  };

  const handleLogout = async () => {
    Modal.confirm({
      content: t('GENERAL.AREYOUSURE'),
      okText: t('GENERAL.YES'),
      cancelText: t('GENERAL.NO'),
      onOk() {
        localStorage.removeItem('userToken');
        setTimeout(() => {
          history.push('/');
        }, 1000);
      },
      onCancel() {},
    });
  };

  const handleResponsiveMenu = () => {
    setIsVisibleResponsiveMenu(!isVisibleResponsiveMenu);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <h1 className="u-p-0 u-m-0 u-m-r-3 header__logo">LOGO</h1>
            <Button
              onClick={handleResponsiveMenu}
              className="u-m-r-3 header__responsive-button"
            >
              {isVisibleResponsiveMenu && <CloseOutlined />}
              {!isVisibleResponsiveMenu && <MenuOutlined />}
            </Button>
          </div>

          <div className="flex items-center">
            <Select
              className="u-m-r-3"
              defaultValue={defaultLanguage}
              onChange={handleLanguage}
            >
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="tr">Türkçe</Select.Option>
            </Select>

            <Tooltip title={t('GENERAL.MYPROFILE')}>
              <Link to="/profile" className="u-m-r-3">
                <Button>
                  <UserOutlined />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip title={t('GENERAL.SETTINGS')}>
              <Link to="/profile" className="u-m-r-3">
                <Button>
                  <SettingOutlined />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip title={t('AUTH.LOGOUT')}>
              <Button onClick={handleLogout} danger type="primary">
                <LogoutOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>

        <HeaderMenu responsive={isVisibleResponsiveMenu} />
      </div>
    </header>
  );
}
