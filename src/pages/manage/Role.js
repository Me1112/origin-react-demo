import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Table, Input, TreeSelect } from 'antd';
import { SearchGrid, FormModal } from 'components';

const Role = props => {
  const { dispatch, loading, role, privilegeList } = props;
  const { list, showAddModal } = role;

  const search = () => {
    dispatch({
      type: 'role/fetchRoleList',
    });
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 50,
      render: (text, row, index) => index + 1,
    },
    {
      title: 'userId',
      dataIndex: 'userId',
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

  const showAddRole = () => {
    dispatch({
      type: 'role/update',
      payload: {
        showAddModal: true,
      },
    });
  };

  const hideAddRole = () => {
    dispatch({
      type: 'role/update',
      payload: {
        showAddModal: false,
      },
    });
  };

  const addRole = () => {};

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SearchGrid
        {...{
          renderBtn: [
            {
              text: '新增角色',
              icon: 'plus',
              action: showAddRole,
            },
          ],
        }}
      />
      <FormModal
        visible={showAddModal}
        onCancel={hideAddRole}
        onSave={addRole}
        title="新增角色"
        {...{
          formFields: [
            {
              label: '角色名',
              name: 'role',
              render: <Input />,
              options: {
                rules: [
                  {
                    required: true,
                    message: '请输入角色名',
                  },
                ],
              },
            },
            {
              label: '角色编号',
              name: 'code',
              render: <Input />,
              options: {
                rules: [
                  {
                    required: true,
                    message: '请输入角色编号',
                  },
                ],
              },
            },
            {
              label: '角色描述',
              name: 'description',
              render: <Input.TextArea />,
              options: {
                rules: [
                  {
                    required: true,
                    message: '请输入角色描述',
                  },
                ],
              },
            },
            {
              label: '权限',
              name: 'privilege',
              render: (
                <TreeSelect
                  treeData={privilegeList}
                  treeCheckable
                  treeDefaultExpandAll
                />
              ),
              options: {
                rules: [
                  {
                    required: true,
                    message: '请选择权限',
                  },
                ],
              },
            },
          ],
        }}
      />
      <div>
        <Table
          {...{
            loading: loading.effects['user/fetchRoleList'],
            rowKey: 'appId',
            columns,
            dataSource: list,
          }}
        />
      </div>
    </>
  );
};

export default connect(({ global, role, loading }) => ({
  privilegeList: global.privilegeList,
  loading,
  role,
}))(Role);
