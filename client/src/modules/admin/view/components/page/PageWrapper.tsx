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
  addButtonProps?: ButtonProps;
  content: React.ReactNode;
  subsection?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export function PageWrapper({
  page,
  addButtonProps,
  content,
  subsection,
  isLoading = false,
  isError = false,
  errorMessage = DEFAULT_ERROR_MESSAGE
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
      <div className="page-header border-b-2 flex items-center justify-between p-6">
        <PageHeaderTitle page={page} />

        <div></div>

        { addButtonProps ? <Button { ...addButtonProps } /> : EMPTY_STRING }
      </div>

      { subsection ? <div>{ subsection }</div> : EMPTY_STRING }

      <div>{ content }</div>
    </div>
  );

}
