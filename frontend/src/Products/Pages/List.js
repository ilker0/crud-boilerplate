import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Tooltip, Dropdown, Menu, notification } from 'antd';
import { ProductFilter, ProductTable } from 'Products/Components';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  CallSetPagination,
  CallSetOrder,
  CallProducts,
  CallDeleteProduct,
  CallSaveProduct,
  CallUpdateProduct,
} from 'Products/Actions/Product';
import { CallCategoryByName } from 'Categories/Actions/CategoryActions';
import { Create } from './Create';
import { Edit } from './Edit';

export function ProductList() {
  const { t } = useTranslation();
  const [isVisibleFilters, setisVisibleFilters] = useState(true);
  const [editData, setEditData] = useState(null);
  const [isVisibleEditView, setIsVisibleEditView] = useState(false);
  const [isVisibleCreateView, setIsVisibleCreateView] = useState(false);

  const dispatch = useDispatch();

  const ProductListState = useSelector((state) => {
    const {
      ProductReducer: { ProductReducer },
    } = state;

    return ProductReducer;
  });

  const CategoryListState = useSelector((state) => {
    const {
      CategoryReducer: { CategoryReducer },
    } = state;

    return CategoryReducer;
  });

  const handleOnUpdateSubmit = async (values) => {
    try {
      await dispatch(CallUpdateProduct(values));
      notification.success({
        message: t('GENERAL.SUCCESSFUL'),
      });

      setIsVisibleEditView(false);
      setEditData(null);
      getProducts();
    } catch (err) {
      setIsVisibleEditView(false);
      notification.error({
        message: t('GENERAL.UNSUCCESSFUL'),
        description: t(`ERRORS.${err.message}`),
      });
    }
  };

  const handleOnSubmit = async (values) => {
    try {
      await dispatch(CallSaveProduct(values));
      notification.success({
        message: t('GENERAL.SUCCESSFUL'),
      });
      setIsVisibleCreateView(false);
      getProducts();
    } catch (err) {
      notification.error({
        message: t('GENERAL.UNSUCCESSFUL'),
        description: t(`ERRORS.${err.message}`),
      });
    }
  };

  const getProducts = async () => {
    try {
      await dispatch(CallProducts());
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateViewOpen = () => {
    setIsVisibleCreateView(true);
  };

  const handleEditViewClose = () => {
    setIsVisibleEditView(false);
  };

  const handleCreateViewClose = () => {
    setIsVisibleCreateView(false);
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

      await dispatch(CallProducts());
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterVisible = () => {
    setisVisibleFilters(!isVisibleFilters);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(CallDeleteProduct(id));
      await getProducts();

      notification.success({
        message: t('GENERAL.SUCCESSFUL'),
      });
    } catch (err) {
      notification.error({
        message: t('GENERAL.UNSUCCESSFUL'),
        description: t(`ERRORS.${err.message}`),
      });
    }
  };

  const handleUpdate = async (data) => {
    try {
      await setEditData(data);
      setIsVisibleEditView(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeCategory = async (val) => {
    dispatch(CallCategoryByName(val));
  };

  useEffect(() => {
    getProducts();
  }, []);

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
                    Export
                  </Button>
                </Dropdown>
                <Button
                  onClick={handleCreateViewOpen}
                  className="u-m-l-3"
                  type="primary"
                >
                  <PlusOutlined />
                  {t('PRODUCT.NEWPRODUCT')}
                </Button>
              </div>
            </div>
            <ProductTable
              data={ProductListState.data}
              count={ProductListState.count}
              loading={ProductListState.loading}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              handleTableChange={handleTableChange}
            />

            {isVisibleCreateView && (
              <Create
                visible={isVisibleCreateView}
                onClose={handleCreateViewClose}
                onSubmit={handleOnSubmit}
                loading={ProductListState.submitLoading}
                handleChangeCategory={handleChangeCategory}
                categories={CategoryListState.filterData}
                filterLoading={CategoryListState.filterLoading}
              />
            )}

            {isVisibleEditView && (
              <Edit
                visible={isVisibleEditView}
                onClose={handleEditViewClose}
                onSubmit={handleOnUpdateSubmit}
                loading={ProductListState.submitLoading}
                initialValues={editData}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
