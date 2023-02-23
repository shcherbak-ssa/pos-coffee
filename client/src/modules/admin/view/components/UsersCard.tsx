import type { EntityComponentProps, UserSchema } from 'shared/types';

import { CardWrapper } from '@admin/view/components/CardWrapper';
import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { UsersImage } from '@admin/view/components/UsersImage';

export function UsersCard({ entity: user, className }: EntityComponentProps<UserSchema>) {

  return (
    <CardWrapper className={className}>
      <div className="flex-center flex-col text-center full">
        <UsersImage
          className="mb-6"
          image={user.image}
          size="xlarge"
        />

        <h3 className="mb-3">{ `${user.name} ${user.surname}` }</h3>

        <UsersTypeLabel type={user.type} />
      </div>
    </CardWrapper>
  );

}
