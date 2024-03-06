import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import ElementPage from '@/pages/ElementPage';
import HomePage from '@/pages/HomePage';
import OverviewPage from '@/pages/OverviewPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/all" element={<OverviewPage />} />
            <Route path="/element/:id" element={<ElementPage />} />
        </Route>,
    ),
);

export default router;
