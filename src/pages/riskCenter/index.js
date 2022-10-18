import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { Resizable } from 'react-resizable';
import { Table, Input, Button, Dropdown, Icon, Menu, Col } from 'antd';
import { SearchGrid, FormModal, PortalTable } from 'components';
import styles from './index.module.less';

const RiskCenter = props => {
  const { dispatch, loading, role, privilegeList } = props;
  const { list, showAddModal } = role;

  const search = () => {
    dispatch({
      type: 'role/fetchRoleList',
    });
  };
  const columns = [
    {
      title: '用户账户',
      dataIndex: 'index',
      align: 'center',
      ellipsis: true,
      width: 80,
      render: (text, row, index) => index + 1,
    },
    {
      title: '警报',
      dataIndex: 'lastVerify',
      align: 'center',
      width: 100,
    },
    {
      title: '关闭警报',
      dataIndex: 'account',
      align: 'center',
      width: 100,
    },
    {
      title: '警报数',
      dataIndex: 'type',
      align: 'center',
      width: 80,
    },
    {
      title: '最高严重程度',
      dataIndex: 'result',
      align: 'center',
      width: 100,
    },
    {
      title: '最终结果',
      dataIndex: 'create',
      align: 'center',
      width: 80,
    },
    {
      title: '审核通过',
      dataIndex: 'create',
      align: 'center',
      width: 80,
    },
    {
      title: '决策',
      dataIndex: 'create',
      align: 'center',
      width: 80,
    },
    {
      title: '未读邮件',
      dataIndex: 'create',
      align: 'center',
      width: 80,
    },
  ];

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['risk-center']}>
      {/* <SearchGrid
        {...{
          seachFields: [
            {
              name: 'username',
              render: (
                <InputGroup compact>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Button style={{ width: '20%' }}>
                      <Icon type="filter" />
                      <span className={styles['filter-text']}>筛选器</span>
                    </Button>
                  </Dropdown>
                  <Input style={{ width: '80%' }} placeholder="开始筛选" />
                </InputGroup>
              ),
              span: 24,
            },
          ],
          onSearch: params => search(params),
          showSearch: false,
        }}
      /> */}
      <Table
        {...{
          loading: loading.effects['user/fetchRoleList'],
          rowKey: 'index',
          columns,
          resizable: false,
          bordered: false,
          dataSource: list,
          // scroll: { y: 'calc( 100vh - 308px )' },
        }}
      />
    </div>
  );
};

export default connect(({ global, role, loading }) => ({
  privilegeList: global.privilegeList,
  loading,
  role,
}))(RiskCenter);
