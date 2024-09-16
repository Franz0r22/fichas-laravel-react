import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@public/css/global.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Layout from '@/Layouts/Layout';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';

createInertiaApp({
  title: title => `${title} - ${import.meta.env.VITE_APP_NAME}`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}/${name}.jsx`];
    page.default.layout = page.default.layout || (page => <Layout>{page}</Layout>);
    return page;
  },
  setup({ el, App, props }) {
    const recaptchaKey = props.initialPage.props.recaptcha_site_key;
    createRoot(el).render(
      <BrowserRouter>
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
          <App {...props} />
        </GoogleReCaptchaProvider>
      </BrowserRouter>
    );
  },
});
