import classnames from 'classnames';

export type Props = {
  children: React.ReactNode;
  className?: string;
}

export function CardWrapper({ children, className }: Props) {

  return (
    <div className={classnames('card-wrapper rounded-xl p-4', className)}>
      { children }
    </div>
  );

}
