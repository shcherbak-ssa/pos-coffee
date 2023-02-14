import { PrimeIcons } from 'primereact/api';
import { Avatar } from 'primereact/avatar';

export type Props = {
  photo: string;
  className?: string;
  size?: "xlarge" | "normal" | "large";
}

export function UserPhoto({ className, photo, size = 'large' }: Props) {

  return (
    <Avatar
      className={className}
      icon={PrimeIcons.USER}
      size={size}
    />
  );

}
