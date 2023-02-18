import { EmptyComponent } from 'view/components/EmptyComponent';

import {
  Props as AddActionProps,
  PageHeaderAddActionContainer,
} from '@admin/view/containers/PageHeaderAddActionContainer';
import {
  Props as EntityActionsProps,
  PageHeaderEntityActionsContainer,
} from '@admin/view/containers/PageHeaderActionsContainer';

export type Props = {
  isEntityPage: boolean;
  entityActionsProps?: EntityActionsProps;
  addActionProps?: AddActionProps;
}

export function PageHeaderActions({ isEntityPage, entityActionsProps, addActionProps }: Props) {

  if (isEntityPage) {
    if (entityActionsProps) {
      return <PageHeaderEntityActionsContainer {...entityActionsProps} />;
    }

    return <EmptyComponent />;
  }

  if (addActionProps) {
    return <PageHeaderAddActionContainer {...addActionProps} />;
  }

  return <EmptyComponent />;

}
