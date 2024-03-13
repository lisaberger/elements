import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router';
import { createHashRouter } from 'react-router-dom';

const ElementPage = lazy(() => import('@/pages/ElementPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const OverviewPage = lazy(() => import('@/pages/OverviewPage'));

const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/all" element={<OverviewPage />} />
            <Route path="/element/:id" element={<ElementPage />} />
        </Route>,
    ),
);

export default router;
