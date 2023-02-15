import { NavigateFunction, useNavigate } from 'react-router-dom';
import type { MenuItem } from 'primereact/menuitem';
import { BreadCrumb } from 'primereact/breadcrumb';

import type { AppPageSchema } from '@admin/shared/types';

export type Props = {
  page: AppPageSchema;
}

export function PageHeaderTitle({ page }: Props) {

  const navigate: NavigateFunction = useNavigate();

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

    return page.child
      ? planePageObject(page.child, result)
      : result;
  }

  return (
    <BreadCrumb
      model={planePageObject(page)}
      home={convertPageToMenuItem(page)}
    />
  );

}
