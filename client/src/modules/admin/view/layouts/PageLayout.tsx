import type { AppPageSchema, PageAddButtonProps } from '@admin/shared/types';
import { ControlGroup } from '@admin/shared/constants';
import { useCurrentPage } from '@admin/view/hooks/current-page';
import { PageHeaderHeadingContainer } from '@admin/view/containers/PageHeaderContainer';
import { PageSubHeaderActionsContainer } from '@admin/view/containers/PageSubHeaderActionsContainer';
import { PageSubHeaderViewsContainer } from '@admin/view/containers/PageSubHeaderViewsContainer';
import { PageWrapper } from '@admin/view/components/PageWrapper';

export type Props = {
  page: AppPageSchema;
  children: React.ReactNode;
  showSubHeader?: boolean;
  controlGroups?: ControlGroup[];
  showTabs?: boolean;
  buttonProps?: PageAddButtonProps;
}

export function PageLayout({
  page,
  children,
  buttonProps,
  showSubHeader = true,
  showTabs = true,
  controlGroups = [ ControlGroup.ACTIONS, ControlGroup.VIEWS ],
}: Props) {

  useCurrentPage(page);

  function renderSubHeader(): React.ReactNode {
    if (showSubHeader) {
      return (
        <div className="border-b-2 px-6 py-4 flex items-center justify-between">
          { renderSubHeaderActions() }
          { renderSubHeaderViews() }
        </div>
      );
    }
  }

  function renderSubHeaderActions(): React.ReactNode {
    if (controlGroups.includes(ControlGroup.ACTIONS)) {
      return <PageSubHeaderActionsContainer />;
    }
  }

  function renderSubHeaderViews(): React.ReactNode {
    if (controlGroups.includes(ControlGroup.VIEWS)) {
      return <PageSubHeaderViewsContainer />;
    }
  }

  return (
    <PageWrapper>
      <PageHeaderHeadingContainer
        showTabs={showTabs}
        addButton={buttonProps}
      />

      { renderSubHeader() }

      { children }
    </PageWrapper>
  );

}
