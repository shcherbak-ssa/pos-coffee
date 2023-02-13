import classnames from 'classnames';
import { Button, type ButtonProps } from 'primereact/button';

import type { AppPageSchema } from 'modules/admin/shared/types';
import { EMPTY_STRING } from 'shared/constants';

export type Props = {
  page: AppPageSchema;
  addButtonProps?: ButtonProps;
  children: React.ReactNode;
}

export function PageContainer({ page, addButtonProps, children }: Props) {

  return (
    <div className="bg-white rounded-t-xl shadow overflow-hidden">
      <div className="page border-b-2 flex items-center justify-between p-6">
        <div className="flex items-center gap-6">
          <i className={classnames('text-xl', page.icon)} />

          <h2 className="font-semibold text-xl">{ page.title }</h2>
        </div>

        <div></div>

        { addButtonProps ? <Button { ...addButtonProps } /> : EMPTY_STRING }
      </div>

      <div className="border-b-2 px-6 py-4"></div>

      <div>
        { children }
      </div>
    </div>
  );

}
