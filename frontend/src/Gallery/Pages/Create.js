import React from 'react';
import { Modal, Skeleton, Form, Input, Button, Select, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { InboxOutlined } from '@ant-design/icons';

const Create = ({ visible, onClose, loading }) => {
  const { t } = useTranslation();

  const onCancel = () => {
    onClose();
  };

  const onSubmit = () => {};

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      {loading && <Skeleton />}
      {!loading && (
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item required name="category" label={t('GENERAL.CATEGORY')}>
            <Select showSearch allowClear>
              <Select.Option value={1}>1</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item required name="name" label={t('GALLERY.PHOTONAME')}>
            <Input />
          </Form.Item>

          <Form.Item
            required
            valuePropName="fileList"
            label={t('GENERAL.PHOTOS')}
          >
            <Upload.Dragger
              multiple
              accept={['.png', '.jpg', '.jpeg']}
              name="files"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>

          <div className="flex justify-end">
            <Button onClick={onClose} className="u-m-r-3">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export { Create };
