import type { UserSchema } from 'shared/types';

export type Props = {
  user: UserSchema;
}

export function HomeWelcome({ user }: Props) {

  return (
    <div>
      <h2 className="text-3xl">Good Day, { user.name }!</h2>
    </div>
  );

}
