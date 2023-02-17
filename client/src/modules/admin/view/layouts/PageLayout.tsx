import { ConfirmDialog } from 'primereact/confirmdialog';

import { EMPTY_STRING } from 'shared/constants';
import { NotificationContainer } from 'view/containers/NotificationContainer';
import { AppLoader } from 'view/components/AppLoader';

import type { AppPageSchema, TabItem } from '@admin/shared/types';
import { AppHeaderContainer } from '@admin/view/containers/AppHeaderContainer';
import { AppMenuContainer } from '@admin/view/containers/AppMenuContainer';
import { PageContentContainer } from '@admin/view/containers/PageContentContainer';
import { PageHeaderTitleContainer } from '@admin/view/containers/PageHeaderHeadingContainer';
import { PageHeaderTabsContainer } from '@admin/view/containers/PageHeaderTabsContainer';
import { PageSubHeaderContainer } from '@admin/view/containers/PageSubHeaderContainer';
import { type Props as ActionsProps, PageHeaderActions } from '@admin/view/components/PageHeaderActions';
import { type Props as PageMessageProps, PageMessage } from '@admin/view/components/PageMessage';

export type Props = {
  page: AppPageSchema;
  actionsProps: ActionsProps;
  showSubHeader: boolean;
  children: React.ReactNode;
  tabs?: TabItem[];
  isLoading?: boolean;
  messageProps?: PageMessageProps;
}

export function PageLayout({
  page,
  actionsProps,
  children,
  showSubHeader,
  tabs = [],
  isLoading = false,
  messageProps,
}: Props) {

  function drawContent(): React.ReactNode {
    if (isLoading) {
      return <AppLoader />;
    }

    if (messageProps) {
      return <PageMessage {...messageProps} />;
    }

    return children;
  }

  // @TODO: add skeleton

  return (
    <div className="app-container full relative">
      <AppHeaderContainer />
      <AppMenuContainer />

      <PageContentContainer
        header={
          <>
            <PageHeaderTitleContainer page={page} />
            <PageHeaderTabsContainer tabs={tabs} />
            <PageHeaderActions {...actionsProps} />
          </>
        }
      >
        { showSubHeader ? <PageSubHeaderContainer /> : EMPTY_STRING }

        { drawContent() }
      </PageContentContainer>

      <NotificationContainer />
      <ConfirmDialog />
    </div>
  );

}
