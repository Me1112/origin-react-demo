export default [
  {
    path: '/user',
    models: ['login', 'menu'],
    component: 'layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      {
        path: '/user/login',
        exact: true,
        name: 'login',
        component: 'pages/Login',
      },
    ],
  },
  {
    path: '/',
    models: ['global', 'menu'],
    component: 'layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/main/index' },
      {
        path: '/main',
        name: '仪表盘',
        exact: true,
        component: 'pages/IndexPage',
        isMenu: true,
        routes: [
          {
            key: '/index',
            path: '/main/index',
            name: '仪表盘',
            exact: true,
            icon: 'SVG-home',
            model: [],
            component: 'pages/home/index',
          },
          {
            key: '/eventCenter',
            path: '/main/eventCenter',
            name: '申请中心',
            exact: true,
            icon: 'SVG-eventCenter',
            models: ['manage/role'],
            component: 'pages/eventCenter/index',
          },
          {
            key: '/caseMgmt',
            path: '/main/caseMgmt',
            name: '案件管理',
            exact: true,
            icon: 'SVG-caseMgmt',
            models: ['manage/role'],
            component: 'pages/caseMgmt/index',
          },
          {
            key: '/riskCenter',
            path: '/main/riskCenter',
            name: '警报中心',
            exact: true,
            icon: 'SVG-risk',
            models: ['manage/role'],
            component: 'pages/riskCenter/index',
          },
          {
            key: '/export',
            path: '/main/export',
            name: '报告导出',
            exact: true,
            icon: 'SVG-export',
            models: ['export'],
            component: 'pages/export/index',
          },
          {
            key: '/charge',
            path: '/main/charge',
            name: '计费充值',
            exact: true,
            icon: 'SVG-export',
          },
          {
            key: '/devCenter',
            path: '/main/devCenter',
            name: '开发者中心',
            exact: true,
            icon: 'SVG-export',
          },
          {
            key: '/caseDetail',
            path: '/main/caseDetail',
            name: '申请中心',
            exact: true,
            icon: 'SVG-eventCenter',
            models: ['manage/role'],
            component: 'pages/caseMgmt/caseDetail',
          },
          {
            key: '/caseDetail',
            path: '/main/caseDetail',
            name: '查询列表',
            exact: true,
            icon: 'SVG-eventCenter',
            models: ['manage/role'],
            component: 'pages/caseMgmt/caseDetail',
          },
          {
            key: '/seetings',
            path: '/settings',
            name: '设置中心',
            exact: true,
            icon: 'SVG-eventCenter',
            component: 'pages/SubLayout',
            models: ['settings/index'],
            routes: [
              {
                key:'/settings/',
                path:'/settings/userManage',
                name:'用户管理',
                
                component:'pages/settings/userManage/index'
              },
              {
                key:'/settings/',
                path:'/settings/roleManage',
                name:'角色管理',
               
                component:'pages/settings/roleManage/index'
              },
              {
                key:'/settings/',
                path:'/settings/privilegeManage',
                name:'权限管理',
               
                component:'pages/settings/privilegeManage/index'
              }
            ]
          },
          {
            key: '/manage',
            path: '/manage',
            name: '系统管理',
            icon: 'SVG-eventCenter',
            exact: true,
            routes: [
              {
                key: '/manage/user/list',
                path: '/manage/user/list',
                name: '用戶列表',
                models: ['manage/user'],
                component: 'pages/manage/User',
              },
              {
                key: '/manage/user/role',
                path: '/manage/user/role',
                name: '角色管理',
                models: ['manage/role'],
                component: 'pages/manage/Role',
              },
            ],
          },
        ],
      },
      {
        path: '/exception',
        component: 'pages/IndexPage',
        name: '异常页面',
        exact: true,
        routes: [
          {
            path: '/exception/403',
            exact: true,
            name: 'not-permission',
            component: 'pages/exception/403',
          },
          {
            path: '/exception/404',
            exact: true,
            name: 'not-find',
            component: 'pages/exception/404',
          },
          {
            path: '/exception/500',
            exact: true,
            name: 'server-error',
            component: 'pages/exception/500',
          },
        ],
      },
    ],
  },
];
