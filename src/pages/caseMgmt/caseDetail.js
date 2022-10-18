import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Col, Card, Icon } from 'antd';
import { FullScreen } from 'components';
import styles from './index.module.less';

const CaseDetail = props => {
  const { dispatch, loading, role, privilegeList } = props;
  const { list, showAddModal } = role;

  const cardDomMap = [
    {
      title: '案件信息',
      render: '',
    },
    {
      title: '案件申请',
      render: '',
    },
    {
      title: '案件使用者',
      render: '',
    },
    {
      title: '案件历史',
      render: '',
    },
    {
      title: '案件交易',
      render: '',
    },
    {
      title: '案件警报',
      render: '',
    },
  ];

  const renderCardContent = cardDomMap => {
    return cardDomMap.map(card => (
      <Col span={8}>
        <FullScreen>
          {({ isFull, running, openMax, closeMax }) => (
            <Card
              size="small"
              title={card.title}
              extra={
                <>
                  <Icon
                    type="fullscreen"
                    title={isFull ? '退出全屏（Esc）' : '全屏'}
                    className={styles['full-btn']}
                    onClick={isFull ? closeMax : openMax}
                  />
                  <Icon
                    title="设置"
                    className={styles['set-btn']}
                    type="setting"
                  />
                </>
              }
            >
              {card.render}
            </Card>
          )}
        </FullScreen>
      </Col>
    ));
  };

  return (
    <div className={styles['case-detail']}>{renderCardContent(cardDomMap)}</div>
  );
};

export default connect(({ global, role, loading }) => ({
  privilegeList: global.privilegeList,
  loading,
  role,
}))(CaseDetail);
