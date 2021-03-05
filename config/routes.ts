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
    name:'base',
    icon: 'dashboard',
    routes: [
      // dashboard
      
      {
        name: 'stu',
        path: '/base/stuTable',
        component: './StuTable',
      },
      {
        name: 'teacher',
        path: '/base/TeacherTable',
        component: './Teacher',
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
    redirect: '/list',
  },
  {
    component: './404',
  },
];
