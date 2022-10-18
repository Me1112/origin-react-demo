import { connect } from 'dva';
import React, { useEffect } from 'react';
import { Input, Form, Icon, Button, Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
// 引入particles插件
import 'particles.js/particles';
import styles from './login.module.less';
const Login = ({ form, login, user, menu, dispatch, location }) => {
  const json = require('./particleJson.json');
  const loadParticles = () => {
    window.particlesJS('loginBg', json);
  };

  useEffect(() => {
    loadParticles();
  }, []);

  const { getFieldDecorator } = form;
  const submitLogin = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            params: values,
            location,
          },
        });
      }
    });
  };

  console.log(window.particlesJS);

  return (
    <div id="loginBg" className={styles['login']}>
      <div className={styles['logo']} />
      <div className={styles['login_form']}>
        <p className={styles['login_title']}>通付盾信用认证平台</p>
        <Form onSubmit={submitLogin}>
          <Tabs tabBarGutter={10}>
            <Tabs.TabPane tab="用户登录" key="1">
              <Form.Item>
                {getFieldDecorator('userName', { rules: [{ required: true }] })(
                  <Input
                    size="large"
                    prefix={
                      <div className={styles['prefixDiv']}>
                        <Icon type="user" /> <span />
                      </div>
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', { rules: [{ required: true }] })(
                  <Input
                    size="large"
                    prefix={
                      <div className={styles['prefixDiv']}>
                        <Icon type="lock" /> <span />
                      </div>
                    }
                    type={'password'}
                  />
                )}
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="二维码登录" key="2"></Tabs.TabPane>
          </Tabs>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: '100%', background: '#3D9DE9' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ login, user, menu }) => ({
  login,
  user,
  menu,
}))(Form.create({ name: 'login' })(withRouter(Login)));
