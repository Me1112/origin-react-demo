import React from 'react';
import { Form, Icon, Button, Col, Row } from 'antd';
import styles from './index.module.less';

const SearchGrid = ({
  seachFields = [],
  renderBtn = [],
  form,
  onClear = () => {},
  onSearch = () => {},
  showSearch = true,
}) => {
  const { getFieldDecorator } = form;

  const clearFields = () => {
    form.resetFields();
    onClear();
  };

  const search = () => {
    onSearch(form.getFieldsValue() || {});
  };
  return (
    <Form
      onSubmit={search}
      className={styles.formGrid}
      layout="inline"
      style={{ overflow: 'hidden' }}
    >
      <Row justify="space-between">
        {!!seachFields.length && (
          <Col span={24}>
            {seachFields.map((el, idx) => (
              <Col key={`${idx + 1}`} md={el.span} sm={24}>
                <Form.Item
                  label={el.label}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  style={{ paddingRight: '20px', width: '100%' }}
                >
                  {getFieldDecorator(el.name)(el.render)}
                </Form.Item>
              </Col>
            ))}
          </Col>
        )}
        <Col
          span={5}
          className={`${styles.btnGroup} ${
            styles[!seachFields.length ? 'btnLeft' : '']
          }`}
        >
          {!!seachFields.length && showSearch && (
            <>
              <Button onClick={search} type="primary">
                搜索
              </Button>
              <Button onClick={clearFields}>清除</Button>
            </>
          )}
          {renderBtn.map((btn, i) => (
            <Button
              key={btn.text + i}
              type={btn.type || 'primary'}
              onClick={btn.action || (() => {})}
            >
              {btn.icon && <Icon type={btn.icon} />}
              {btn.text}
            </Button>
          ))}
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(SearchGrid);
