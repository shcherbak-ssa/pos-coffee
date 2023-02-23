import { type MouseEvent, useEffect, useState } from 'react';
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
} from '@admin/shared/types';
import { ControlGroup, ControllerName, ListView, StoreName } from '@admin/shared/constants';
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
  controlGroups?: ControlGroup[];
  actionProps?: ActionsProps,
  addButton?: PageAddButtonProps;
  showTabs?: boolean;
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
  messageProps,
  showTabs = true,
  isLoading = false,
  controlGroups = [ ControlGroup.ACTIONS, ControlGroup.VIEWS ],
}: Props) {

  const navigate: NavigateFunction = useNavigate();
  const [ isHookProcessing, setIsHookProcessing ] = useState<boolean>(false);

  const appStore = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const pageComponentProps: PageComponentProps = { appStore, appController };

  useEffect(() => {
    setIsHookProcessing(true);

    appController.setCurrentPage(page)
      // .then(() => appController.updateViewState('listTab', ListTab.ACTIVE))
      .then(() => appController.updateViewState('listView', ListView.TABLE))
      .then(() => setIsHookProcessing(false));
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

  function drawTabs(): React.ReactNode {
    if (showTabs) {
      return <PageHeaderTabsContainer {...pageComponentProps} />;
    }
  }

  function drawActions(): React.ReactNode {
    if (isEntityPage && actionProps) {
      return <PageHeaderActionsContainer {...actionProps} />;
    } else
      if (addButton) {
        return (
          <Button
            className="p-button-sm"
            icon={PrimeIcons.PLUS}
            label={addButton.label}
            onClick={handleAddButonClick}
          />
        );
      }
  }

  function drawSubHeader(): React.ReactNode {
    if (showSubHeader) {
      return (
        <PageSubHeaderContainer
          groups={controlGroups}
          {...pageComponentProps}
        />
      );
    }
  }

  function drawContent(): React.ReactNode {
    if (messageProps) {
      return <PageMessage {...messageProps} />;
    }

    return children;
  }

  if (isHookProcessing || isLoading) {
    return <AppLoader />;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="page-header border-b-2 flex items-center justify-between p-6 relative">
        <PageHeaderHeadingContainer
          page={page}
          navigate={navigate}
        />

        { drawTabs() }

        { drawActions() }
      </div>

      { drawSubHeader() }

      { drawContent() }
    </div>
  );

}
