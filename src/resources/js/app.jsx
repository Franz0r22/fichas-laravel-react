import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@public/css/global.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Layout from '@/Layouts/Layout';

createInertiaApp({
  title: title => `${title} - Laravel React`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    page.default.layout = page.default.layout || (page => <Layout>{page}</Layout>);
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
