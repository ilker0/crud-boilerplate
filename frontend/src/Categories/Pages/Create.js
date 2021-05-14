import React from 'react';
import { Modal, Form, Button, Input, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/lib/form/Form';

const CreateView = ({ visible, onClose, onSubmit, loading }) => {
  const { t } = useTranslation();

  const [form] = useForm();

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      width={500}
      footer={false}
      visible={visible}
      onCancel={handleOnClose}
    >
      {loading && <Skeleton />}
      {!loading && (
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            rules={[{ required: true }]}
            name="name"
            label={t('CATEGORY.CATEGORYNAME')}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-end">
            <Button onClick={onClose} className="u-m-r-3">
              {t('GENERAL.CANCEL')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('GENERAL.SAVE')}
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export { CreateView };
