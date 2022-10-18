import { connect } from "dva";
import React, { useState } from "react";
import { Layout, Spin, Tree, Input, Table, Pagination, Row, Col ,
Button,Divider} from "antd";
import styles from "./index.module.less";
import classnames from "classnames";
const initTreeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
          {
            title: "leaf",
            key: "0-0-0-2",
          },
        ],
      },

      {
        title: "parent 1-2",
        key: "0-0-2",
        children: [
          {
            title: "leaf",
            key: "0-0-2-0",
          },
          {
            title: "leaf",
            key: "0-0-2-1",
          },
        ],
      },
    ],
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const UserManage = () => {
  const { Sider, Content } = Layout;
  const [areaName, setAreaName] = useState("杭州市");
  const [areaNo, setAreaNo] = useState(0);
  const [treeData, setTreeData] = useState(initTreeData);
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const { Search } = Input;
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo?.name ?? null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo?.columnKey === "name" && sortedInfo?.order,
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo?.columnKey === "age" && sortedInfo?.order,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo?.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo?.columnKey === "address" && sortedInfo?.order,
      ellipsis: true,
    },
    {
      title:'操作',
      dataIndex:'',
      key:'',
      render:(text, record) => (

        <>
         <span>
          <Button type="link" >详情</Button>
        <Divider type="vertical"/>
          <Button type="link" >冻结账户</Button>
        </span>
        </>
       
      )
    }
  ];
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  const handleChange = () => {};
  return (
    <div className={styles["user-manage"]}>
      <Layout>
        <Sider className={styles["page-border-right"]}>
          <Spin spinning={false}>
            <h3
              className={classnames(
                styles["page-border-bottom"],
                styles["page-title-font"]
              )}
            >
              杭州市
            </h3>
            <div>
              <Tree
                onExpand={true}
                defaultExpandedKeys={["0-0-0"]}
                onSelect={onSelect}
                treeData={treeData}
                className={styles["page-body-font"]}
              />
            </div>
          </Spin>
        </Sider>

        <Content>
          <Spin spinning={false}>
            <h3
              className={classnames(
                styles["page-border-bottom"],
                styles["page-title-font"]
              )}
            >
              {areaName}
              <span className={styles["page-title-no"]}>{areaNo}</span>人{" "}
            </h3>
            <div className={styles["page-body-font"]}>
              <div className={styles.pageTable}>
              <Search
                placeholder="请输入"
                enterButton="Search"
                onSearch={(value) => console.log(value)}
                style={{ width: 400, marginBottom: "16px" }}
              />
              <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                bordered
                loading={false}
                pagination={false}
              />
              </div>
              <div style={{marginBottom:'28px'}}>
              <Row justify={'space-between'}>
                <Col span={8}>
                  <Button type="primary" style={{marginRight:'18px'}}>新增人员</Button>
                  <Button type="primary">同步人员</Button>
                </Col>
                <Col span={16} >
                  <Pagination total={50} showSizeChanger showQuickJumper style={{textAlign:'right'}}/>
                </Col>
              </Row>
              </div>
             
            </div>
          </Spin>
        </Content>
      </Layout>
    </div>
  );
};

export default connect(() => ({}))(UserManage);
