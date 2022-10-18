import React, { useState } from 'react';
import { connect } from 'dva';
import {
  TimePicker,
  Row,
  Col,
  DatePicker,
  Badge,
  Switch,
  Button,
  Icon,
} from 'antd';
import moment from 'moment';
import styles from './index.module.less';

const Export = props => {
  const { exportm, dispatch } = props;
  const { startDate, endDate, startTime, endTime, step } = exportm;
  // const [step, setStep] = useState(1);
  const dateFormat = 'YYYY年MM月DD日';
  const stepList = ['选择时间范围', '选择条件', '生成报告'];

  const _update = payload => {
    dispatch({
      type: 'exportm/update',
      payload,
    });
  };
  startDate && endDate && startTime && endTime
    ? _update({ step: 2 })
    : _update({ step: 1 });
  const onPickerChange = (m, val, name) => {
    _update({ [name]: val });
  };

  const download = () => {};
  return (
    <Row className={styles['export-cot']}>
      <Col className={styles['export-left']} span={10}>
        <div style={{ width: '230px', margin: '0 auto' }}>生成报告</div>
        <div className={styles['steps-cot']}>
          {stepList.map((item, idx) => {
            const textDisabled =
              styles[
                (idx !== 0 && step === 1) || (idx === 2 && step !== 3)
                  ? 'text-disabled'
                  : ''
              ];
            return (
              <div className={`${styles['step']}`}>
                <Col span={5} className={styles['num']}>
                  <span className={`${textDisabled}`}>{idx + 1}</span>
                  {idx !== stepList.length - 1 &&
                    ((idx === 0 && step !== 1) ||
                      (idx === 1 && step === 3)) && <Icon type="check" />}
                </Col>
                <Col span={12} className={`${styles['text']} ${textDisabled}`}>
                  {item}
                </Col>
              </div>
            );
          })}
        </div>
      </Col>
      <Col className={styles['export-right']} span={14}>
        <div className={styles['step']}>
          <div className={styles['title']}>选择开始结束时间</div>
          <Row className={styles['step-info']}>
            <Col span={11}>
              <Badge
                status="success"
                className={styles['item']}
                text="开始时间"
              />
              <div style={{ marginLeft: '10px' }}>
                <div className={styles['item']}>
                  <DatePicker
                    mode="date"
                    style={{ width: '100%' }}
                    format={dateFormat}
                    onChange={(m, val) => onPickerChange(m, val, 'startDate')}
                    placeholder="请选择日期"
                  />
                </div>
                <div className={styles['item']}>
                  <TimePicker
                    style={{ width: '100%' }}
                    onChange={(m, val) => onPickerChange(m, val, 'startTime')}
                    placeholder="请选择日期"
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                  />
                </div>
              </div>
            </Col>
            <Col span={11} offset={2}>
              <Badge
                status="error"
                className={styles['item']}
                text="结束时间"
              />
              <div style={{ marginLeft: '10px' }}>
                <div className={styles['item']}>
                  <DatePicker
                    mode="date"
                    style={{ width: '100%' }}
                    onChange={(m, val) => onPickerChange(m, val, 'endDate')}
                    format={dateFormat}
                    placeholder="请选择日期"
                  />
                </div>
                <div className={styles['item']}>
                  <TimePicker
                    style={{ width: '100%' }}
                    onChange={(m, val) => onPickerChange(m, val, 'endTime')}
                    placeholder="请选择时间"
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className={`${styles['step']} ${
            styles[step === 1 ? 'step-disabled' : '']
          }`}
        >
          <div className={styles['title']}>选择报告筛选条件</div>
          <div className={styles['step-info']}>
            <div className={styles['item']}>
              <Switch size="small" disabled={step === 1} />
              &nbsp; 申请
            </div>
            <div className={styles['item']}>
              <Switch size="small" disabled={step === 1} />
              &nbsp; 案件
            </div>
            <div className={styles['item']}>
              <Switch size="small" disabled={step === 1} />
              &nbsp; 警报
            </div>
          </div>
        </div>
        <div
          className={`${styles['step']} ${
            styles[step !== 3 ? 'step-disabled' : '']
          }`}
        >
          <div className={styles['title']}>
            确认以下详细信息，然后按下面的生成完成报告导出
          </div>
          <div className={styles['step-info']}>
            <Badge
              status="default"
              className={styles['item']}
              text="时间：2020年3月3日 14:48:18"
            />
            <br />
            <Badge
              status="default"
              className={styles['item']}
              text="筛选条件：2020年3月3日 14:48:21"
            />
          </div>
        </div>
        <div align="right">
          <Button type="primary" disabled={step !== 3}>
            下载报告
            <Icon type="download" />
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default connect(({ exportm }) => ({ exportm }))(Export);
