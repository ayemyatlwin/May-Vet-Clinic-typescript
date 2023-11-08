import Layout from '@/components/Layout';
import { AppContextProvider } from '@/context/AppContext';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <AppContextProvider>
      <Layout>
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      </Layout>
    </AppContextProvider>
  );
}
