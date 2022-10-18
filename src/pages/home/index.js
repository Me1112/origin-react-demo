import React from 'react';
import { Tabs, Icon, Col, Row } from 'antd';
import styles from './index.module.less';

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <div className={styles['board']}>
      <Tabs defaultActiveKey="2">
        <TabPane tab={<span>我的仪表盘</span>} key="1">
          <div className={styles['board-cot']}>
            <span className={styles['board-title']}>我的事件</span>
            <Row className={styles['header-row']}>
              <Col span={4}>队列</Col>
              <Col span={5} align="center">
                新事件
              </Col>
              <Col span={5} align="center">
                进程中
              </Col>
              <Col span={5} align="center">
                审核完成
              </Col>
              <Col span={5} align="center">
                小结
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <div>无队列</div>
                <div>默认</div>
                <div>总计</div>
              </Col>
              <Col span={5} align="center">
                <div>0</div>
                <div>10</div>
              </Col>
              <Col span={5} align="center">
                <div>0</div>
                <div>10</div>
              </Col>
              <Col span={5} align="center">
                <div>0</div>
                <div>10</div>
              </Col>
              <Col span={5} align="center">
                <div>0</div>
                <div>10</div>
                <div>10</div>
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
