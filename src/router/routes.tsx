import { lazy } from 'react';

import type { RouteObject } from 'react-router-dom';

import { RouteName } from './route-name';

const HomePage = lazy(() => import('@/pages/HomePage'));
const OverviewPage = lazy(() => import('@/pages/OverviewPage'));
const ElementPage = lazy(() => import('@/pages/ElementPage'));

const routes: RouteObject[] = [
    {
        path: RouteName.Home,
        index: true,
        element: <HomePage />,
    },
    {
        path: RouteName.Overview,
        element: <OverviewPage />,
    },
    {
        path: RouteName.Element,
        element: <ElementPage />,
    },
];

export default routes;
