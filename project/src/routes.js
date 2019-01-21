import React from 'react';

import Dashboard from './components/templates/pages/Dashboard';
// import DashboardContent from './components/templates/pages/DashboardContent';

import Lists from './components/templates/pages/Lists';
import TodoList from './components/templates/pages/TodoList';
import ListAdd from './components/templates/pages/ListAdd';

import NotFound from './components/templates/pages/NotFound';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/',
    component: (Dashboard),
    routes: [
      // {
      //   path: '/dashboard/',
      //   exact: true,
      //   component: DashboardContent,
      // },
      {
        path: '/dashboard/lists',
        exact: true,
        component: Lists,
      },
      {
        path: '/dashboard/lists/:listId',
        component: TodoList,
      },
      {
        path: '/dashboard/list/add-list',
        component: ListAdd,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default Routes;
