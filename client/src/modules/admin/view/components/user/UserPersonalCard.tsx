import type { UserSchema } from '@admin/shared/types';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { UserTypeLabel } from '@admin/view/components/user/UserTypeLabel';
import { UserPhoto } from '@admin/view/components/user/UserPhoto';

export type Props = {
  user: UserSchema;
}

export function UserPersonalCard({ user }: Props) {

  return (
    <CardWrapper>
      <div className="flex-center flex-col text-center full">
        <UserPhoto
          className="mb-6"
          photo=""
          size="xlarge"
        />

        <h3 className="mb-3">{ `${user.name} ${user.surname}` }</h3>

        <UserTypeLabel type={user.type} />
      </div>
    </CardWrapper>
  );

}
