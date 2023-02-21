import { type MouseEvent, useEffect } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type {
  AppController,
  AppPageSchema,
  AppStore,
  PageAddButtonProps,
  PageComponentProps,
  TabItem,
} from '@admin/shared/types';
import { ControllerName, ListTab, StoreName } from '@admin/shared/constants';
import { PageSubHeaderContainer } from '@admin/view/containers/PageSubHeaderContainer';
import { PageHeaderTabsContainer } from '@admin/view/containers/PageHeaderTabsContainer';
import { PageHeaderHeadingContainer } from '@admin/view/containers/PageHeaderHeadingContainer';
import {
  type Props as ActionsProps,
  PageHeaderActionsContainer,
} from '@admin/view/containers/PageHeaderActionsContainer';
import { type Props as PageMessageProps, PageMessage } from '@admin/view/components/PageMessage';

export type Props = {
  page: AppPageSchema;
  showSubHeader: boolean;
  isEntityPage: boolean;
  children: React.ReactNode;
  actionProps?: ActionsProps,
  addButton?: PageAddButtonProps;
  tabs?: TabItem[];
  isLoading?: boolean;
  messageProps?: PageMessageProps;
}

export function PageLayout({
  page,
  addButton,
  showSubHeader,
  isEntityPage,
  actionProps,
  children,
  tabs = [],
  isLoading = false,
  messageProps,
}: Props) {

  const navigate: NavigateFunction = useNavigate();

  const { state: { view } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const pageComponentProps: PageComponentProps = { view, appController };

  useEffect(() => {
    appController.setCurrentPage(page);
  }, [page.title]);

  function handleAddButonClick(e: MouseEvent): void {
    e.preventDefault();

    if (addButton) {
      if (addButton.to) {
        navigate(addButton.to);
        return;
      }

      if (addButton.command) {
        addButton.command();
      }
    }
  }

  function drawActions(): React.ReactNode {
    if (isEntityPage && actionProps) {
      return (
        <PageHeaderActionsContainer {...actionProps} />
      );
    } else {
      return (
        <Button
          className="p-button-sm"
          icon={PrimeIcons.PLUS}
          label={addButton?.label || 'Add'}
          onClick={handleAddButonClick}
        />
      );
    }
  }

  function drawSubHeader(): React.ReactNode {
    if (showSubHeader) {
      return <PageSubHeaderContainer {...pageComponentProps} />;
    }
  }

  function drawContent(): React.ReactNode {
    if (isLoading) {
      return <AppLoader />;
    }

    if (messageProps) {
      return <PageMessage {...messageProps} />;
    }

    return children;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="page-header border-b-2 flex items-center justify-between p-6 relative">
        <PageHeaderHeadingContainer
          page={page}
          navigate={navigate}
        />

        <PageHeaderTabsContainer
          tabs={tabs}
          {...pageComponentProps}
        />

        { drawActions() }
      </div>

      { drawSubHeader() }

      { drawContent() }
    </div>
  );

}
