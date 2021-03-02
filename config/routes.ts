import { layout } from "@/app";

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'crown',
    component: './Welcome',
  },
  {
    path:"/base",
    name:'基本数据维护',
    icon: 'dashboard',
    routes: [
      // dashboard
      
      {
        name: '学生维护',
        icon: 'dashboard',
        path: '/base/stuTable',
        component: './stuTable',
      },
    ]},
      
  {
    name: 'table',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
