import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import classnames from 'classnames';
import { ScrollPanel } from 'primereact/scrollpanel';

import { useStore } from 'view/hooks/store';
import { NotificationContainer } from 'view/containers/NotificationContainer';
import { AppLoader } from 'view/components/AppLoader';
import { ConfimComponents } from 'view/components/ConfimComponents';

import type { AppStore } from '@admin/shared/types';
import { PagePath, StoreName } from '@admin/shared/constants';
import { AppHeaderContainer } from '@admin/view/containers/AppHeaderContainer';
import { AppMenuContainer } from '@admin/view/containers/AppMenuContainer';

const HomePage = lazy(() => import('@admin/view/pages/HomePage'));
const ProductsPage = lazy(() => import('@admin/view/pages/ProductsPage'));
const ProductsInfoPage = lazy(() => import('@admin/view/pages/ProductsInfoPage'));
const CategoriesPage = lazy(() => import('@admin/view/pages/CategoriesPage'));
const OrdersPage = lazy(() => import('@admin/view/pages/OrdersPage'));
const OrdersInfoPage = lazy(() => import('@admin/view/pages/OrdersInfoPage'));
const UsersPage = lazy(() => import('@admin/view/pages/UsersPage'));
const UsersInfoPage = lazy(() => import('@admin/view/pages/UsersInfoPage'));
const SettingsPage = lazy(() => import('@admin/view/pages/SettingsPage'));

export function AppLayout() {

  const { state: { isAppMenuOpen } } = useStore(StoreName.APP) as AppStore;

  return (
    <div className="app-container full relative">
      <BrowserRouter>
        <AppHeaderContainer />
        <AppMenuContainer />

        <ScrollPanel style={{ width: '100%', height: 'calc(100% - 6rem)' }}>
          <div
            className={classnames('p-12 duration-200', {
              'lg:pl-72': isAppMenuOpen,
              'lg:pl-36': !isAppMenuOpen,
            })}
          >
            <Suspense fallback={<AppLoader />} >
              <Routes>
                <Route
                  path={PagePath.HOME}
                  element={<HomePage />}
                />

                <Route
                  path={PagePath.PRODUCTS}
                  element={<ProductsPage />}
                />
                <Route
                  path={PagePath.PRODUCTS_INFO}
                  element={<ProductsInfoPage />}
                />

                <Route
                  path={PagePath.CATEGORIES}
                  element={<CategoriesPage />}
                />

                <Route
                  path={PagePath.ORDERS}
                  element={<OrdersPage />}
                />
                <Route
                  path={PagePath.ORDERS_INFO}
                  element={<OrdersInfoPage />}
                />

                <Route
                  path={PagePath.USERS}
                  element={<UsersPage />}
                />
                <Route
                  path={PagePath.USERS_INFO}
                  element={<UsersInfoPage />}
                />

                <Route
                  path={PagePath.SETTINGS}
                  element={<SettingsPage />}
                />
              </Routes>
            </Suspense>
          </div>
        </ScrollPanel>

        <NotificationContainer />
        <ConfimComponents />
      </BrowserRouter>
    </div>
  );

}
