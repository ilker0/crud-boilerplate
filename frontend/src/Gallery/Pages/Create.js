import React from 'react';
import { Modal, Skeleton, Form, Input, Button, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/lib/form/Form';

const Create = ({ visible, onClose, loading, onSubmit }) => {
  const { t } = useTranslation();
  const [form] = useForm();

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      {loading && <Skeleton />}
      {!loading && (
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            rules={[{ required: true }]}
            name="name"
            label={t('GALLERY.PHOTONAME')}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="photo"
            label={t('GENERAL.PHOTO')}
            rules={[{ required: true }]}
          >
            <Form.Item
              name="photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                height={150}
                maxCount={1}
                accept={['.jpg', '.png', '.jpeg']}
                beforeUpload={() => false}
                name="files"
                listType="picture"
              >
                <p>{t('GALLERY.CLICKORDRAG')}</p>
              </Upload.Dragger>
            </Form.Item>
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

export { Create };
