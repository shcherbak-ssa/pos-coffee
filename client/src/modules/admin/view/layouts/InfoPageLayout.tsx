import type { AppPageSchema } from '@admin/shared/types';
import { useCurrentPage } from '@admin/view/hooks/current-page';
import { PageHeaderHeadingContainer } from '@admin/view/containers/PageHeaderContainer';
import type { Props as ActionsProps } from '@admin/view/containers/PageHeaderActionsContainer';
import { PageWrapper } from '@admin/view/components/PageWrapper';

export type Props = {
  page: AppPageSchema;
  children: React.ReactNode;
  actionProps?: ActionsProps,
}

export function InfoPageLayout({ page, actionProps, children }: Props) {

  useCurrentPage(page);

  return (
    <PageWrapper>
      <PageHeaderHeadingContainer
        showTabs={false}
        actionProps={actionProps}
      />

      { children }
    </PageWrapper>
  );

}
