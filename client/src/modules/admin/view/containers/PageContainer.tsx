import classnames from 'classnames';
import { Button, type ButtonProps } from 'primereact/button';

import { EMPTY_STRING } from 'shared/constants';

import type { AppPageSchema } from '@admin/shared/types';

export type Props = {
  page: AppPageSchema;
  addButtonProps?: ButtonProps;
  content: React.ReactNode;
  subsection?: React.ReactNode;
}

export function PageContainer({ page, addButtonProps, content, subsection }: Props) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="page border-b-2 flex items-center justify-between p-6">
        <div className="flex items-center gap-6">
          <i className={classnames('text-xl', page.icon)} />

          <h2 className="font-semibold text-xl">{ page.title }</h2>
        </div>

        <div></div>

        { addButtonProps ? <Button { ...addButtonProps } /> : EMPTY_STRING }
      </div>

      { subsection ? <div>{ subsection }</div> : EMPTY_STRING }

      <div>{ content }</div>
    </div>
  );

}
