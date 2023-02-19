import classames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { Avatar } from 'primereact/avatar';

export type Props = {
  photo: string;
  className?: string;
  size?: "xlarge" | "normal" | "large";
}

export function UsersPhoto({ className, photo, size = 'large' }: Props) {

  return (
    <Avatar
      className={classames('overflow-hidden', className)}
      shape="circle"
      icon={PrimeIcons.USER}
      size={size}
      image={photo || undefined}
    />
  );

}
