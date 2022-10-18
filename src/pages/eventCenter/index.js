import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import { Resizable } from 'react-resizable';
import { Table, Input, Button, Dropdown, Icon, Menu, Col } from 'antd';
import { SearchGrid, OmTable } from 'components';
import styles from './index.module.less';

const InputGroup = Input.Group;

const EventCenter = props => {
  const { dispatch, loading, role, privilegeList } = props;
  const { list, showAddModal } = role;
  let _ref = useRef();
  const [leftWidth, setLeftWidth] = useState(500);

  const search = () => {
    dispatch({
      type: 'role/fetchRoleList',
    });
  };
  const columns = [
    {
      title: '最近更新时间',
      dataIndex: 'index',
      align: 'center',
      width: 150,
      render: (text, row, index) => index + 1,
    },
    {
      title: '最后人工审核',
      dataIndex: 'lastVerify',
      align: 'center',
      width: 150,
    },
    {
      title: '用户账户',
      dataIndex: 'account',
      align: 'center',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      width: 80,
    },
    {
      title: '结果',
      dataIndex: 'result',
      align: 'center',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'create',
      align: 'center',
    },
  ];

  // window.onresize = () => {
  //   setLeftWidth(_ref.offsetWidth - 350);
  // };

  useEffect(() => {
    search();
    setLeftWidth(_ref.offsetWidth - 350);

    // console.log(document.getElementsByClassName('event-center')[0].offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Icon type="user" />
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="user" />
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="user" />
        3rd item
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles['event-center']} ref={ref => (_ref = ref)}>
      <Resizable
        width={leftWidth}
        resizeHandles={['se']}
        height={0}
        onResize={(e, { size }) => {
          if (size <= _ref.offsetWidth - 350) {
            return;
          }
          setLeftWidth(size.width);
        }}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <div style={{ width: leftWidth }} className={styles['left-cot']}>
          <SearchGrid
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
          />
          <OmTable
            {...{
              loading: loading.effects['user/fetchRoleList'],
              rowKey: 'index',
              columns,
              dataSource: list,
              scroll: { x: leftWidth }, // y: 'calc( 100vh - 335px )',
            }}
          />
        </div>
      </Resizable>
      <div
        style={{ width: 'calc( 100% - ' + leftWidth + 'px )' }}
        className={styles['right-cot']}
      >
        111
      </div>
    </div>
  );
};

export default connect(({ global, role, loading }) => ({
  privilegeList: global.privilegeList,
  loading,
  role,
}))(EventCenter);
