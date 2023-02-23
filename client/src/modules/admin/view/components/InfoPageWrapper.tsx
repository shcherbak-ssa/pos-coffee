import classnames from 'classnames';

export type Props = {
  children: React.ReactNode;
  className?: string;
}

export function InfoPageWrapper({ children, className }: Props) {

  return (
    <div className={classnames('grid gap-4 full p-6', className)}>
      { children }
    </div>
  );

}
