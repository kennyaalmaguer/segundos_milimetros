import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const rutas = {
    welcome: '/',
    login: '/login',
    register: '/registro',
    logout: '/logout',
    dashboard: '/dashboard',
    'profile.edit': '/profile',
    'profile.update': '/profile',
    'profile.destroy': '/profile',
    'password.update': '/password',
    'password.confirm': '/confirm-password',
    'password.email': '/forgot-password',
    'password.store': '/reset-password',
    'verification.send': '/email/verification-notification',
};

window.route = (nombre) => {
    if (!nombre) {
        return { current: (n) => window.location.pathname === rutas[n] };
    }
    return rutas[nombre] ?? '/';
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});