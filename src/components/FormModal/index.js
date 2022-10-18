import React from 'react';
import { Form, Modal, Row, Col } from 'antd';
import styles from './index.module.less';

const FormModal = ({
  form,
  visible = false,
  onSave = () => {},
  onCancel = () => {},
  formFields = [],
  okText = '确认',
  cancelText = '取消',
  ...rest
}) => {
  const { getFieldDecorator } = form;

  const save = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onSave(values);
      }
    });
  };

  const cancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <div>
      <Modal
        className={styles.formModal}
        closable
        width="600px"
        maskClosable={false}
        visible={visible}
        onOk={save}
        onCancel={cancel}
        okText={okText}
        cancelText={cancelText}
        {...rest}
      >
        <Form
          onSubmit={save}
          layout="inline"
          style={{ overflow: 'hidden', margin: '20px 0' }}
        >
          <Row justify="space-between">
            {formFields.map((el, idx) => {
              return (
                <Col key={`${idx + 1}`} md={el.span} sm={24}>
                  <Form.Item
                    label={el.label}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    style={{
                      paddingRight: '20px',
                      width: '100%',
                      marginBottom: '20px',
                    }}
                  >
                    {getFieldDecorator(el.name, el.options)(el.render)}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create()(FormModal);
