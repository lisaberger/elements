import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import './assets/styles/index.scss';
import HomePage from '@/pages/HomePage';
import OverviewPage from '@/pages/OverviewPage';
import ElementPage from '@/pages/ElementPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/all" element={<OverviewPage />} />
            <Route path="/element/:id" element={<ElementPage />} />
        </Route>,
    ),
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
