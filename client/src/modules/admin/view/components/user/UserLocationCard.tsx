import type { UserSchema } from '@admin/shared/types';
import { LocationCard } from '@admin/view/components/LocationCard';

export type Props = {
  user: UserSchema;
  className?: string;
}

export function UserLocationCard({ user, className }: Props) {

  return (
    <LocationCard className={className}></LocationCard>
  );

}
