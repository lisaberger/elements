import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

const ElementPage = lazy(() => import('@/pages/ElementPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const OverviewPage = lazy(() => import('@/pages/OverviewPage'));

export enum AppRoutes {
    Home = '/',
    Overview = '/all',
    Element = '/element/:id',
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/all" element={<OverviewPage />} />
            <Route path="/element/:id" element={<ElementPage />} />
        </Route>,
    ),
    {
        basename: import.meta.env.BASE_URL,
    }
);

export default router;
