import type { EntityComponentProps, UserSchema } from 'shared/types';

import { CardWrapper } from '@admin/view/components/card/CardWrapper';
import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { UsersPhoto } from '@admin/view/components/UsersPhoto';

export function UsersPersonalInfo({ entity: user, className }: EntityComponentProps<UserSchema>) {

  return (
    <CardWrapper className={className}>
      <div className="flex-center flex-col text-center full">
        <UsersPhoto
          className="mb-6"
          photo={user.photo}
          size="xlarge"
        />

        <h3 className="mb-3">{ `${user.name} ${user.surname}` }</h3>

        <UsersTypeLabel type={user.type} />
      </div>
    </CardWrapper>
  );

}
