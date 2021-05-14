import React from 'react';
import { Modal, Skeleton, Form, Input, Button, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/lib/form/Form';
import Config from 'Config';

const Edit = ({ visible, onClose, loading, onSubmit, initialValues }) => {
  const { t } = useTranslation();
  const [form] = useForm();
  console.log(initialValues);
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
        <Form
          initialValues={initialValues}
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
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
                defaultFileList={[
                  {
                    uid: '-1',
                    status: 'done',
                    name: initialValues.name,
                    url: `${Config.STATIC_FOLDER_URL}/${initialValues.filePath}`,
                    thumbUrl: `${Config.STATIC_FOLDER_URL}/${initialValues.filePath}`,
                  },
                ]}
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

export { Edit };
