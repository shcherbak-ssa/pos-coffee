import classames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { Avatar } from 'primereact/avatar';

export type Props = {
  image: string;
  className?: string;
  size?: 'xlarge' | 'normal' | 'large';
}

export function ProductsImage({ className, image, size = 'large' }: Props) {

  return (
    <Avatar
      className={classames('overflow-hidden', className)}
      icon={PrimeIcons.BOX}
      size={size}
      image={image || undefined}
    />
  );

}
