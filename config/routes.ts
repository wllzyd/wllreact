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
    layout:false,
    routes:[
      {
        path: '/base',
        routes: [
          {
            name: 'login',
            path: '/base/stuTable',
            component: './StuTable',
          },
        ],
      },
    ]
  },
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
