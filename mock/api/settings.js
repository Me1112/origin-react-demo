module.exports = (mockjs) => {
  return {
    "GET  /api/settings/cityList": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {
              list: {
                children: [
                  {
                    deptCode: "370202240000",
                    deptName: "丰潭路",
                    id: "10537",
                    parentCode: "370202000000",
                    children: [
                      {
                        deptCode: "370202140000",
                        deptName: "文一路",
                        id: "10541",
                        parentCode: "370202000000",
                      },
                      {
                        deptCode: "370202150000",
                        deptName: "文二路",
                        id: "10401",
                        parentCode: "370202000000",
                      },
                      {
                        deptCode: "370202230000",
                        deptName: "古翠路",
                        id: "10398",
                        parentCode: "370202000000",
                        children: [
                          {
                            deptCode: "370202230001",
                            deptName: "文三路",
                            id: "10628",
                            parentCode: "370202230000",
                          },
                          {
                            deptCode: "370202230002",
                            deptName: "文晖路",
                            id: "10629",
                            parentCode: "370202230000",
                          },
                        ],
                      },
                      {
                        deptCode: "370202240000",
                        deptName: "丰潭路",
                        id: "10537",
                        parentCode: "370202000000",
                      },
                    ],
                  },
                ],
                deptCode: "370200000000",
                deptName: "杭州市",
                id: "1",
              },
            },
          })
        );
      }
    },
    "GET /api/settings/userList": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {
              "list|100": [
                {
                  name: "@cname",
                  position: "@cword(3,6)",
                  account: "@cword(3,6)",
                  "accountStatus|1": [true, false],
                  "role|1": [
                    "管理员",
                    "开发账号",
                    "演示账号",
                    "超级管理员",
                    "普通用户",
                    "其他",
                  ],
                  userId: "@id",
                  IDCard: "340823202010100101",
                  password: "123456",
                  userName: "testUser",
                  telPhoneNumber: "15866778899",
                  shortTelPhoneNum: "",
                  warnNo: "",
                },
              ],
            },
          })
        );
      }
    },
    "GET /api/settings/roleList": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.json({
            success: true,
            payload: {
              "list|7": [
                {
                  roleId: "@id",
                  "roleName|1": [
                    "管理员",
                    "开发账号",
                    "演示账号",
                    "超级管理员",
                    "普通用户",
                    "测试账号",
                    "其他",
                  ],
                },
              ],
            },
          })
        );
      }
    },
    "PUT /api/settings/modifyUser": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {
              name: "@cname",
              position: "@cword(3,6)",
              account: "@cword(3,6)",
              "accountStatus|1": [true, false],
              "role|1": [
                "管理员",
                "开发账号",
                "演示账号",
                "超级管理员",
                "普通用户",
                "其他",
              ],
              userId: "@id",
              IDCard: "340823202010100101",
              password: "123456",
              userName: "testUser",
              telPhoneNumber: "15866778899",
              shortTelPhoneNum: "",
              warnNo: "",
            },
          })
        );
      }
    },
    "POST /api/settings/addUser": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {
              name: "@cname",
              position: "@cword(3,6)",
              account: "@cword(3,6)",
              "accountStatus|1": [true, false],
              "role|1": [
                "管理员",
                "开发账号",
                "演示账号",
                "超级管理员",
                "普通用户",
                "其他",
              ],
              userId: "@id",
              IDCard: "340823202010100101",
              password: "123456",
              userName: "testUser",
              telPhoneNumber: "15866778899",
              shortTelPhoneNum: "",
              warnNo: "",
            },
          })
        );
      }
    },
    "GET /api/settings/moduleList": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {
              list: [
                {
                  id: 10060,
                  resIcon: "home",
                  resKey: "desk$",
                  resName: "工作台",
                  resType: 1,
                  status: 0,
                  children: [
                    {
                      id: 10063,
                      parentId: 10060,
                      resIcon: "cleanAccess",
                      resKey: "desk$/index",
                      resName: "概览",
                      resType: 1,
                      status: 0,
                    },
                  ],
                },
                {
                  id: 10062,
                  resIcon: "set",
                  resKey: "set$",
                  resName: "设置中心",
                  resType: 1,
                  status: 0,
                  children: [
                    {
                      id: 10108,
                      parentId: 10062,
                      resIcon: "userManage",
                      resKey: "set$/userManage",
                      resName: "用户管理",
                      childrn: [
                        {
                          id: 11003,
                          parentId: 10108,
                          resIcon: "cleanAccess",
                          resKey: "desk$/index",
                          resName: "看看",
                          children: [
                            {
                              id: 11004,
                              parentId: 11003,
                              resIcon: "cleanAccess",
                              resKey: "desk$/index",
                              resName: "测试",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 10109,
                      parentId: 10062,
                      resIcon: "roleManage",
                      resKey: "set$/roleManage",
                      resName: "角色管理",
                    },
                    {
                      id: 10110,
                      parentId: 10062,
                      resIcon: "unitCount",
                      resKey: "set$/moduleManage",
                      resName: "权限管理",
                    },
                  ],
                },
              ],
            },
          })
        );
      }
    },
    "POST /api/settings/addRoLe": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {},
          })
        );
      }
    },
    "DELETE /api/settings/deleteUser/:userId": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {},
          })
        );
      }
    },
    "PUT /api/settings/modifyModule": (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {},
          })
        );
      }
    },
  };
};
