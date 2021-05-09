import React from 'react';
import { Modal, Form, Button, Input, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

const CreateView = ({ visible, onClose, onSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <Modal width={500} footer={false} visible={visible} onCancel={onClose}>
      {loading && <Skeleton />}
      {!loading && (
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item required name="name" label={t('CATEGORY.CATEGORYNAME')}>
            <Input />
          </Form.Item>

          <Form.Item
            required
            name="id"
            label={t('CATEGORY.CATEGORYNAME')}
            hidden
          >
            <Input />
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

export { CreateView };
