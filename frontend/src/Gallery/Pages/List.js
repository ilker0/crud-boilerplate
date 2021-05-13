import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Tooltip,
  Card,
  Skeleton,
  Popconfirm,
  Pagination,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { GalleryFilter } from '../Components';
import { Create } from './Create';
import { Edit } from './Edit';

export function GalleryList() {
  const { t } = useTranslation();
  const [isVisibleFilters, setisVisibleFilters] = useState(true);
  const [isVisibleCreateView, setIsVisibleCreateView] = useState(false);
  const [isVisibleEditView, setIsVisibleEditView] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();

  const GalleryState = useSelector((state) => {
    const {
      GalleryReducer: { GalleryReducer },
    } = state;

    return GalleryReducer;
  });

  const handleFilter = async (val) => {
    console.log(val);
    dispatch();
  };

  const handleFilterVisible = () => {
    setisVisibleFilters(!isVisibleFilters);
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

  const handleOnSubmit = async () => {};

  const handleOnUpdateSubmit = async () => {
    setEditData(null);
  };

  const onDelete = (id) => {
    console.log(id);
  };

  return (
    <Row>
      <Col span={5} className="flex justify-between items-center u-m-b-5">
        <h3 className="u-m-0">{t('GENERAL.GALLERY')}</h3>
      </Col>

      <Col span={24}>
        <Row>
          {isVisibleFilters && (
            <Col xs={24} sm={24} md={24} lg={10} xl={5}>
              <GalleryFilter handleFilter={handleFilter} />
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
                <Button
                  onClick={handleCreateViewOpen}
                  className="u-m-l-3"
                  type="primary"
                >
                  <PlusOutlined />
                  {t('GALLERY.NEWPHOTO')}
                </Button>
              </div>

              <Pagination defaultCurrent={6} total={500} />
            </div>
            {GalleryState.loading && (
              <>
                <Skeleton active /> <Skeleton active />
              </>
            )}
            {!GalleryState.loading && (
              <Row gutter={15}>
                <Col span={4} className="u-m-t-3">
                  <Card
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <Tooltip
                        placement="top"
                        title={t('GALLERY.COPTYTHELINK')}
                      >
                        <CopyOutlined key="setting" />
                      </Tooltip>,
                      <Tooltip placement="top" title={t('GENERAL.UPDATE')}>
                        <EditOutlined key="edit" />
                      </Tooltip>,
                      <Popconfirm
                        placement="topLeft"
                        title={t('GENERAL.AREYOUSURE')}
                        onConfirm={() => onDelete('1')}
                        okText={t('GENERAL.YES')}
                        cancelText={t('GENERAL.NO')}
                      >
                        <Tooltip placement="top" title={t('GENERAL.DELETE')}>
                          <CloseOutlined key="ellipsis" />
                        </Tooltip>
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta title="Card title" />
                  </Card>
                </Col>
              </Row>
            )}

            <Create
              visible={isVisibleCreateView}
              onClose={handleCreateViewClose}
              onSubmit={handleOnSubmit}
              loading={GalleryState.submitLoading}
            />
            {isVisibleEditView && (
              <Edit
                visible={isVisibleEditView}
                onClose={handleEditViewClose}
                onSubmit={handleOnUpdateSubmit}
                loading={GalleryState.submitLoading}
                initialValues={editData}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
