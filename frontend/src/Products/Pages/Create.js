import React from 'react';
import { Modal, Form, Button, Input, Skeleton, Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/lib/form/Form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Create = ({
  visible,
  onClose,
  onSubmit,
  loading,
  handleChangeCategory,
  categories,
  filterLoading,
}) => {
  const { t } = useTranslation();
  const [form] = useForm();

  const handleOnClose = () => {
    form.resetFields();
    onClose();
  };

  const onChangeCategory = (val) => {
    if (val.trim().length > 0) {
      setTimeout(() => {
        handleChangeCategory(val);
      }, 1000);
    }
  };

  return (
    <Modal
      width={700}
      footer={false}
      visible={visible}
      onCancel={handleOnClose}
    >
      {loading && <Skeleton />}
      {!loading && (
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            rules={[{ required: true }]}
            name="category"
            label={t('GENERAL.CATEGORY')}
          >
            <Select
              loading={filterLoading}
              showSearch
              onSearch={onChangeCategory}
              filterOption={false}
              dropdownRender={(menu) => (
                <>
                  {filterLoading && (
                    <div className="flex justify-center">
                      <Spin />
                    </div>
                  )}
                  {!filterLoading && menu}
                </>
              )}
            >
              {categories.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="name"
            label={t('PRODUCT.PRODUCTNAME')}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label={t('GENERAL.DESCRIPTION')}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name="price"
            label={t('PRODUCT.PRICE')}
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name="priceType"
            label={t('PRODUCT.PRICETYPE')}
          >
            <Select>
              <Select.Option value={0}>₺</Select.Option>
              <Select.Option value={1}>$</Select.Option>
              <Select.Option value={2}>€</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            extra={t('PRODUCT.ITMUSTBEPHOTOLINK')}
            rules={[{ required: true }]}
            name="mainPhoto"
            label={t('PRODUCT.MAINPHOTO')}
          >
            <Input />
          </Form.Item>

          <Form.List name="photos" className="u-m-t-3">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between"
                  >
                    <Form.Item
                      style={{ width: '95%' }}
                      extra={t('PRODUCT.ITMUSTBEPHOTOLINK')}
                      {...restField}
                      name={`photo-${key}`}
                      fieldKey={[fieldKey, 'first']}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {t('GENERAL.PHOTO')}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

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
