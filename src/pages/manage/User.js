import { connect } from 'dva';
import React, { useEffect } from 'react';
import { Input, Table } from 'antd';
import { SearchGrid, FormModal } from 'components';

const User = props => {
  const { dispatch, user, loading } = props;
  const { list, showAddModal } = user;
  const search = params => {
    dispatch({
      type: 'user/fetchUserList',
    });
  };
  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 50,
      render: (text, row, index) => index + 1,
    },
    {
      title: 'appId',
      dataIndex: 'appId',
      align: 'center',
      width: 50,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      align: 'center',
      width: 50,
    },
    {
      title: '角色',
      dataIndex: 'role',
      align: 'center',
      width: 50,
    },
  ];

  const showAddUser = () => {
    dispatch({
      type: 'user/update',
      payload: {
        showAddModal: true,
      },
    });
  };

  const hideAddModal = () => {
    dispatch({
      type: 'user/update',
      payload: {
        showAddModal: false,
      },
    });
  };

  const addUser = () => {};

  return (
    <>
      <SearchGrid
        {...{
          seachFields: [
            {
              label: '用户名',
              name: 'username',
              render: <Input />,
              span: 6,
            },
            {
              label: 'appId',
              name: 'appId',
              render: <Input />,
              span: 6,
            },
          ],
          renderBtn: [
            {
              text: '新增用户',
              icon: 'plus',
              action: showAddUser,
            },
          ],
          onSearch: params => search(params),
        }}
      />
      <FormModal
        visible={showAddModal}
        onCancel={hideAddModal}
        onSave={addUser}
        title="新增用户"
        {...{
          formFields: [
            {
              label: 'appId',
              name: 'appId',
              render: <Input />,
              options: {
                rules: [
                  {
                    required: true,
                    message: '请输入appId',
                  },
                ],
              },
            },
            {
              label: 'appId1',
              name: 'appId1',
              render: <Input />,
              options: {
                initialValue: '1231',
              },
            },
            {
              label: 'appId2',
              name: 'appId2',
              render: <Input />,
            },
          ],
        }}
      />
      <div>
        <Table
          {...{
            loading: loading.effects['user/fetchUserList'],
            rowKey: 'appId',
            columns,
            dataSource: list,
          }}
        />
      </div>
    </>
  );
};

export default connect(({ user, loading }) => ({
  user,
  loading,
}))(User);
