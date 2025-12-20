import { Suspense, useEffect } from 'react';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { router } from '@/router';
import { fetchElements, store } from '@/store';

function App() {
    useEffect(() => {
        void store.dispatch(fetchElements());
    }, []);

    return (
        <Provider store={store}>
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
        </Provider>
    );
}

export default App;
