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
    // <div className="flex items-center">
    //   {
    //     page.icon
    //       ? <SimpleIcon className="text-xl mr-4" icon={page.icon} />
    //       : EMPTY_STRING
    //   }

    //   <div className="font-semibold text-xl flex items-center gap-4">
    //     <h2>{ page.title }</h2>

    //     {
    //       page.child
    //         ? <>
    //             <span>/</span>
    //             <PageHeaderTitle page={page.child} />
    //           </>
    //         : EMPTY_STRING
    //     }
    //   </div>

    // </div>
  );

}
