module.exports = mockjs => {
  return {
    // 用户菜单
    'GET /api/menu': mockjs.mock({
      success: true,
      payload: [
        {
          key: '/manage' /* key用来和前端route 做配备权限 */,
          path: '/manage',
          name: '系统管理',
          icon: 'dashboard',
          children: [
            {
              key: '/manage/user',
              path: '/manage/user',
              name: '用户管理',
              icon: 'user',
              authority: ['admin'],
              children: [
                {
                  key: '/manage/user/list',
                  name: '用戶列表',
                  icon: 'user',
                  path: '/manage/user/list',
                  authority: ['admin', ['user', 'CRUD']], // 具体的权限 'CRUD' : '增改删'
                },
                {
                  key: '/manage/user/role',
                  name: '角色管理',
                  icon: 'user',
                  path: '/manage/user/role',
                  authority: ['admin', ['manage1', 'C']],
                },
              ],
            },
          ],
        },
      ],
    }),
    'GET /api/privilege': mockjs.mock({
      success: true,
      payload: [
        {
          title: '统计报表',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: '风险概况',
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              title: '历史报表',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: '策略引擎',
          value: '0-1',
          key: '0-1',
          children: [
            {
              title: '场景策略',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              title: '场景指标',
              value: '0-1-2',
              key: '0-1-2',
            },
            {
              title: '场景字段',
              value: '0-1-3',
              key: '0-1-3',
            },
          ],
        },
      ],
    }),
    'GET /api/currentUser': mockjs.mock({
      success: true,
      payload: {
        name: 'Admin',
        sex: 'male',
        faceIcon: '',
        authority: ['admin'],
      },
    }),
  };
};
