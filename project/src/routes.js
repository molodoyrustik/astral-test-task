import React from 'react';

import Dashboard from './components/templates/pages/Dashboard';
import DashboardContent from './components/templates/pages/DashboardContent';

import Lists from './components/templates/pages/Lists';
import ShoppingList from './components/templates/pages/ShoppingList';
import ListAdd from './components/templates/pages/ListAdd';

import NotFound from './components/templates/pages/NotFound';

const Routes = [
  {
    path: '/',
    component: (Dashboard),
    routes: [
      {
        path: '/',
        exact: true,
        component: DashboardContent,
      },
      {
        path: '/dashboard',
        exact: true,
        component: DashboardContent,
      },
      {
        path: '/dashboard/lists',
        exact: true,
        component: Lists,
      },
      {
        path: '/dashboard/lists/:listId',
        component: ShoppingList,
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
