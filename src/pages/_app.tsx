import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import themeConfig from 'src/configs/themeConfig';
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { getUserRole } from 'src/auth.utils';
import AdminLayout from 'src/layouts-Admin/AdminLayout';
import UserLayout from 'src/layouts/UserLayout';
import RhLayout from 'src/layouts-Rh/RhLayout';
import ManagerLayout from 'src/layouts-Manager/ManagerLayout';
import ALayout from 'src/layouts-a/aLayout';

import ThemeComponent from 'src/@core/theme/ThemeComponent';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import LoadingScreen from 'src/views/LoadingPage/LoadingPage';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const Acceuil = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  const fetchUserRole = async () => {
    console.log('Fetching user role...');
    try {
      const role = await getUserRole();
      console.log('User role fetched:', role);
      setUserRole(role);
    } catch (error) {
      console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  // Log userRole whenever it changes
  useEffect(() => {
    console.log('userRole changed:', userRole);
  }, [userRole]);

  useEffect(() => {
    if (themeConfig.routingLoader && router.events) {
      router.events.on('routeChangeStart', () => NProgress.start());
      router.events.on('routeChangeError', () => NProgress.done());
      router.events.on('routeChangeComplete', () => NProgress.done());
    }
    return () => {
      if (themeConfig.routingLoader && router.events) {
        router.events.off('routeChangeStart', () => NProgress.start());
        router.events.off('routeChangeError', () => NProgress.done());
        router.events.off('routeChangeComplete', () => NProgress.done());
      }
    };
  }, [router.events]);

  const getLayout = (role: string | null) => {
    console.log('Getting layout for role:', role);
    if (loading || role === null) {
      // Ne pas afficher l'application pendant que nous sommes en train de charger
      return null;
    }

    if (role === 'Admin') {
      return Component.getLayout ?? ((page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>);
    } else if (role === 'Responsable Rh') {
      return Component.getLayout ?? ((page: React.ReactNode) => <RhLayout>{page}</RhLayout>);
    } else if (role === 'Manager') {
      return Component.getLayout ?? ((page: React.ReactNode) => <ManagerLayout>{page}</ManagerLayout>);
    } else if (role === 'Employe')  {
      return Component.getLayout ?? ((page: React.ReactNode) => <UserLayout>{page}</UserLayout>);
    }else  {
        return Component.getLayout ?? ((page: React.ReactNode) => <ALayout>{page}</ALayout>);
      }
  };

  const layoutComponent = getLayout(userRole);
  
  if (loading || layoutComponent === null) {
      return <LoadingScreen />;

  }


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta name='description' content={`${themeConfig.templateName}`} />
        <meta name='keywords' content='Gestion de congé' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => (
            <ThemeComponent settings={settings}>
              {layoutComponent(<Component {...pageProps} />)}
            </ThemeComponent>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  );
};

export default Acceuil;


