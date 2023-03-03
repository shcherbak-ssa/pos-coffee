import type { MouseEvent } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router';
import type { MenuItem } from 'primereact/menuitem';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import { EMPTY_STRING } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { AppPageSchema, AppStore, PageAddButtonProps } from '@admin/shared/types';
import { NEW_ENTITY_LABEL, StoreName } from '@admin/shared/constants';
import { PageHeaderTabsContainer } from '@admin/view/containers/PageHeaderTabsContainer';
import {
  type Props as ActionsProps,
  PageHeaderActionsContainer,
} from '@admin/view/containers/PageHeaderActionsContainer';

export type Props = {
  showTabs: boolean;
  actionProps?: ActionsProps,
  addButton?: PageAddButtonProps;
}

export function PageHeaderHeadingContainer({ showTabs, actionProps, addButton }: Props) {

  const navigate: NavigateFunction = useNavigate();
  const { state: { currentPage } } = useStore(StoreName.APP) as AppStore;

  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(addButton?.to || EMPTY_STRING);

  function convertPageToMenuItem(page: AppPageSchema): MenuItem {
    return {
      ...page,
      label: page.title,
      disabled: !page.to,
      command: () => {
        if (page.to) {
          navigate(page.to);
        }
      },
    };
  }

  function planePageObject(page: AppPageSchema, result: MenuItem[] = []): MenuItem[] {
    result.push(convertPageToMenuItem(page));

    return page.child && page.child.title
      ? planePageObject(page.child, result)
      : result;
  }

  function handleAddButonClick(e: MouseEvent): void {
    e.preventDefault();

    if (addButton?.to) {
      toInfoPage({ id: NEW_ENTITY_LABEL });
      return;
    }

    if (addButton?.command) {
      addButton.command();
    }
  }

  function renderTabs(): React.ReactNode {
    if (showTabs) {
      return <PageHeaderTabsContainer />;
    }
  }

  function renderActions(): React.ReactNode {
    if (actionProps) {
      return <PageHeaderActionsContainer {...actionProps} />;
    } else
      if (addButton) {
        return (
          <Button
            className="p-button-sm"
            icon={addButton.icon || PrimeIcons.PLUS}
            label={addButton.label}
            onClick={handleAddButonClick}
          />
        );
      }
  }

  return (
    <div className="page-header border-b-2 flex items-center justify-between p-6 relative">
      <BreadCrumb
        model={planePageObject(currentPage)}
        home={convertPageToMenuItem(currentPage)}
      />

      { renderTabs() }

      { renderActions() }
    </div>
  );

}
