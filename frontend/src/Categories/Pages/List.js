import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Tooltip, Dropdown, Menu } from 'antd';
import { CategoryFilter, CategoryTable } from 'Categories/Components';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  CallCategories,
  CallSetPagination,
  CallSetFilter,
  CallSetOrder,
} from 'Categories/Actions/CategoryActions';
import { useDispatch, useSelector } from 'react-redux';

export function CategoryList() {
  const { t } = useTranslation();
  const [isVisibleFilters, setisVisibleFilters] = useState(true);
  const dispatch = useDispatch();

  const CategoryListState = useSelector((state) => {
    const {
      CategoryReducer: { CategoryReducer },
    } = state;

    return CategoryReducer;
  });

  const handleFilterVisible = () => {
    setisVisibleFilters(!isVisibleFilters);
  };

  const getCategories = async () => {
    try {
      await dispatch(CallCategories());
    } catch (err) {
      console.error(err);
    }
  };

  const handleTableChange = async (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;

    try {
      dispatch(
        CallSetPagination({
          skip: current,
          take: pageSize,
        }),
      );

      dispatch(
        CallSetOrder({
          name: sorter.columnKey,
          order: sorter.order,
        }),
      );

      await dispatch(CallCategories());
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = async (val) => {
    try {
      dispatch(CallSetFilter(val));
      await dispatch(CallCategories());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const exportMenu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Excel
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Csv
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row>
      <Col span={5} className="flex justify-between items-center u-m-b-5">
        <h3 className="u-m-0">{t('GENERAL.CATEGORIES')}</h3>
      </Col>

      <Col span={24}>
        <Row>
          {isVisibleFilters && (
            <Col xs={24} sm={24} md={24} lg={10} xl={5}>
              <CategoryFilter handleFilter={handleFilter} />
            </Col>
          )}

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={isVisibleFilters ? 13 : 20}
            xl={isVisibleFilters ? 18 : 24}
            className="b-white u-p-4 shadow-primary u-m-l-a"
          >
            <div className="flex u-m-b-4 justify-between">
              <div>
                <Tooltip title={isVisibleFilters ? 'Gizle' : 'Göster'}>
                  <Button onClick={handleFilterVisible}>
                    {t('GENERAL.FILTERS')}
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
                    {t('GENERAL.EXPORT')}
                  </Button>
                </Dropdown>
                <Button className="u-m-l-3" type="primary">
                  <PlusOutlined />
                  {t('CATEGORY.NEWCATEGORY')}
                </Button>
              </div>
            </div>

            <CategoryTable
              data={CategoryListState.data}
              count={CategoryListState.count}
              loading={CategoryListState.loading}
              handleTableChange={handleTableChange}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
