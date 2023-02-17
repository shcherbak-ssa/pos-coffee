import type { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';

import { EMPTY_STRING } from 'shared/constants';
import { AppLoader } from 'view/components/AppLoader';

import type { AppPageSchema } from '@admin/shared/types';
import { DEFAULT_ERROR_MESSAGE } from '@admin/shared/constants';
import { PageHeaderTitleContainer } from '@admin/view/containers/PageHeaderHeadingContainer';
import { PageMessage } from '@admin/view/components/PageMessage';

export type Props = {
  page: AppPageSchema;
  content: React.ReactNode;
  actions?: React.ReactNode;
  subsection?: React.ReactNode;
  tabs?: MenuItem[];
  currentTabIndex?: number;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export function PageWrapper({
  page,
  content,
  tabs,
  currentTabIndex,
  actions,
  subsection,
  isLoading = false,
  isError = false,
  errorMessage = DEFAULT_ERROR_MESSAGE,
}: Props) {

  if (isError) {
    return <PageMessage type="error" message={errorMessage} />;
  }

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="page-header border-b-2 flex items-center justify-between p-6 relative">
        <PageHeaderTitleContainer page={page} />

        <div className="page-tabs absolute top-0 left-1/2 -translate-x-1/2 h-full">
          { tabs ? <TabMenu model={tabs} activeIndex={currentTabIndex} /> : EMPTY_STRING }
        </div>

        { actions || EMPTY_STRING }
      </div>

      { subsection ? <div>{ subsection }</div> : EMPTY_STRING }

      <div>{ content }</div>
    </div>
  );

}
