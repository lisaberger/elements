import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { fetchElements } from '@/store/slices/elementsSlice';
import router from '@/router/router';

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
