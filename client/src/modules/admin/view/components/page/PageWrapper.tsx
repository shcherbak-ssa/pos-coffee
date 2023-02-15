import { useEffect, useRef } from 'react';
import { Button, type ButtonProps } from 'primereact/button';
import { Messages } from 'primereact/messages';

import { EMPTY_STRING } from 'shared/constants';
import { AppLoader } from 'view/components/AppLoader';

import type { AppPageSchema } from '@admin/shared/types';
import { DEFAULT_ERROR_MESSAGE } from '@admin/shared/constants';
import { PageErrorMessageContent } from '@admin/view/components/page/PageErrorMessageContent';
import { PageHeaderTitle } from '@admin/view/components/page/PageHeaderTitle';

export type Props = {
  page: AppPageSchema;
  content: React.ReactNode;
  tabItems?: React.ReactNode;
  addButtonProps?: ButtonProps;
  subsection?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export function PageWrapper({
  page,
  content,
  tabItems,
  addButtonProps,
  subsection,
  isLoading = false,
  isError = false,
  errorMessage = DEFAULT_ERROR_MESSAGE,
}: Props) {

  const messages = useRef(null);

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      messages.current.show({
        sticky: true,
        severity: 'error',
        closable: false,
        content: <PageErrorMessageContent message={errorMessage} />,
      });
    }
  }, [isError]);

  if (isError) {
    return <Messages ref={messages} />;
  }

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="page-header border-b-2 flex items-center justify-between p-6 relative">
        <PageHeaderTitle page={page} />

        {
          tabItems
            ? <div className="page-tabs absolute top-0 left-1/2 -translate-x-1/2 h-full">
                { tabItems }
              </div>
            : EMPTY_STRING
        }

        { addButtonProps ? <Button { ...addButtonProps } /> : EMPTY_STRING }
      </div>

      { subsection ? <div>{ subsection }</div> : EMPTY_STRING }

      <div>{ content }</div>
    </div>
  );

}
