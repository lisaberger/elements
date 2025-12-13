import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import "./i18n/config.ts";
import '@/assets/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <React.Suspense fallback={
            <div className='text-white'>Loading...</div>
        }>
            <App />
        </React.Suspense>
    </React.StrictMode>
);
