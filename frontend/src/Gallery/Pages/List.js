import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Tooltip,
  Card,
  Skeleton,
  Popconfirm,
  Pagination,
  notification,
  message,
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
import Config from 'Config';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CopyToClipboard } from 'Shared/Utils';
import {
  CallSavePhoto,
  CallPhotos,
  CallDeletePhoto,
  CallSetPagination,
  CallSetFilter,
  CallUpdatePhoto,
} from '../Actions/GalleryActions';
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

  const getPhotos = async () => {
    try {
      await dispatch(CallPhotos());
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = async (val) => {
    try {
      dispatch(CallSetFilter(val));
      getPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterVisible = () => {
    setisVisibleFilters(!isVisibleFilters);
  };

  const handleEditViewOpen = async (data) => {
    try {
      await setEditData(data);
      setIsVisibleEditView(true);
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

  const handleOnSubmit = async (values) => {
    try {
      await dispatch(CallSavePhoto(values));
      notification.success({
        message: t('GENERAL.SUCCESSFUL'),
      });
      setIsVisibleCreateView(false);
      await getPhotos();
    } catch (err) {
      notification.error({
        message: t('GENERAL.UNSUCCESSFUL'),
        description: t(`ERRORS.${err.message}`),
      });
    }
  };

  const handleOnUpdateSubmit = async (values) => {
    try {
      await dispatch(CallUpdatePhoto(values));
      notification.success({
        message: t('GENERAL.SUCCESSFUL'),
      });
      setIsVisibleEditView(false);
      await getPhotos();
    } catch (err) {
      setIsVisibleEditView(false);
      notification.error({
        message: t('GENERAL.UNSUCCESSFUL'),
        description: t(`ERRORS.${err.message}`),
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(CallDeletePhoto(id));
      await getPhotos();

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

  const handlePaginationChange = async (page, pageSize) => {
    try {
      dispatch(
        CallSetPagination({
          skip: page,
          take: pageSize,
        }),
      );

      getPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  const copyClipBoard = (link) => {
    CopyToClipboard(link);
    message.success(t('GENERAL.COPIED'));
  };

  useEffect(() => {
    getPhotos();
  }, []);

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

              <Pagination
                onChange={handlePaginationChange}
                total={GalleryState.count}
                defaultPageSize={10}
                showSizeChanger
              />
            </div>
            {GalleryState.loading && (
              <>
                <Skeleton active /> <Skeleton active />
              </>
            )}
            {!GalleryState.loading && (
              <Row gutter={15}>
                {GalleryState.data.map((item) => (
                  <Col key={item.id} span={4} className="u-m-t-3">
                    <Card
                      cover={
                        <LazyLoadImage
                          effect="black-and-white"
                          height="150"
                          width="100%"
                          alt="example"
                          style={{ objectFit: 'contain' }}
                          src={`${Config.STATIC_FOLDER_URL}/${item.filePath}`}
                          delayTime="0"
                          placeholder={
                            <div
                              style={{
                                height: 150,
                                width: '100%',
                                backgroundColor: 'grey',
                              }}
                            />
                          }
                        />
                      }
                      actions={[
                        <Tooltip
                          placement="top"
                          title={t('GALLERY.COPTYTHELINK')}
                        >
                          <CopyOutlined
                            key="setting"
                            onClick={() =>
                              copyClipBoard(
                                `${Config.STATIC_FOLDER_URL}/${item.filePath}`,
                              )
                            }
                          />
                        </Tooltip>,
                        <Tooltip placement="top" title={t('GENERAL.UPDATE')}>
                          <EditOutlined
                            onClick={() => handleEditViewOpen(item)}
                            key="edit"
                          />
                        </Tooltip>,
                        <Popconfirm
                          placement="topLeft"
                          title={t('GENERAL.AREYOUSURE')}
                          onConfirm={() => handleDelete(item.id)}
                          okText={t('GENERAL.YES')}
                          cancelText={t('GENERAL.NO')}
                        >
                          <Tooltip placement="top" title={t('GENERAL.DELETE')}>
                            <CloseOutlined key="ellipsis" />
                          </Tooltip>
                        </Popconfirm>,
                      ]}
                    >
                      <Card.Meta title={item.name} />
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            {isVisibleCreateView && (
              <Create
                visible={isVisibleCreateView}
                onClose={handleCreateViewClose}
                onSubmit={handleOnSubmit}
                loading={GalleryState.submitLoading}
              />
            )}

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
