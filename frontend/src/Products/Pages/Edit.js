import React from 'react';
import { Modal, Form, Button, Input, Skeleton, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/lib/form/Form';

const Edit = ({ visible, onClose, onSubmit, initialValues, loading }) => {
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          initialValues={initialValues}
        >
          <Form.Item
            rules={[{ required: true }]}
            name="name"
            label={t('CATEGORY.CATEGORYNAME')}
          >
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

          <Form.Item
            rules={[{ required: true }]}
            name="isActive"
            label={t('GENERAL.STATUS')}
          >
            <Select>
              <Select.Option value={1}>{t('GENERAL.ACTIVE')}</Select.Option>
              <Select.Option value={0}>{t('GENERAL.PASSIVE')}</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end">
            <Button onClick={handleOnClose} className="u-m-r-3">
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

export { Edit };
