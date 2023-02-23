import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import classnames from 'classnames';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ScrollPanel } from 'primereact/scrollpanel';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { NotificationContainer } from 'view/containers/NotificationContainer';
import { AppLoader } from 'view/components/AppLoader';

import type { AppStore, AppController, AppComponentProps } from '@admin/shared/types';
import { ControllerName, PagePath, StoreName } from '@admin/shared/constants';
import { AppHeaderContainer } from '@admin/view/containers/AppHeaderContainer';
import { AppMenuContainer } from '@admin/view/containers/AppMenuContainer';

const HomePage = lazy(() => import('@admin/view/pages/HomePage'));
const DashboardPage = lazy(() => import('@admin/view/pages/DashboardPage'));
const ProductsPage = lazy(() => import('@admin/view/pages/ProductsPage'));
const ProductsInfoPage = lazy(() => import('@admin/view/pages/ProductsInfoPage'));
const CategoriesPage = lazy(() => import('@admin/view/pages/CategoriesPage'));
const OrdersPage = lazy(() => import('@admin/view/pages/OrdersPage'));
const OrdersInfoPage = lazy(() => import('@admin/view/pages/OrdersInfoPage'));
const UsersPage = lazy(() => import('@admin/view/pages/UsersPage'));
const UsersInfoPage = lazy(() => import('@admin/view/pages/UsersInfoPage'));
const SettingsPage = lazy(() => import('@admin/view/pages/SettingsPage'));

export function AppLayout() {

  const appStore = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const appProps: AppComponentProps = { appStore, appController };

  return (
    <div className="app-container full relative">
      <BrowserRouter>
        <AppHeaderContainer {...appProps} />
        <AppMenuContainer {...appProps} />

        <ScrollPanel style={{ width: '100%', height: 'calc(100% - 6rem)' }}>
          <div
            className={classnames('p-12 duration-200', {
              'lg:pl-72': appStore.state.isAppMenuOpen,
              'lg:pl-36': !appStore.state.isAppMenuOpen,
            })}
          >
            <Suspense fallback={<AppLoader />} >
              <Routes>
                <Route
                  path={PagePath.HOME}
                  element={<HomePage />}
                />
                <Route
                  path={PagePath.DASHBOARD}
                  element={<DashboardPage />}
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
                  path={PagePath.PRODUCTS_CREATE}
                  element={<ProductsInfoPage isEditMode />}
                />
                <Route
                  path={PagePath.PRODUCTS_EDIT}
                  element={<ProductsInfoPage isEditMode />}
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
                  path={PagePath.USERS_CREATE}
                  element={<UsersInfoPage isEditMode />}
                />
                <Route
                  path={PagePath.USERS_EDIT}
                  element={<UsersInfoPage isEditMode />}
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
        <ConfirmDialog />
      </BrowserRouter>
    </div>
  );

}
