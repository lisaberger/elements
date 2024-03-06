import { RouterProvider } from 'react-router';
import router from '@/router/router';

import '@/assets/styles/index.scss';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { fetchElements } from '@/store/slices/elementsSlice';
import { Suspense } from 'react';

store.dispatch(fetchElements());

function App() {
    return (
        <Provider store={store}>
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
        </Provider>
    );
}

export default App;
