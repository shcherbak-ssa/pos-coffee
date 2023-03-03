import classnames from 'classnames';

export type Props = {
  className?: string;
}

export function HomeWelcome({ className }: Props) {

  return (
    <div className={classnames('', className)}>
      <h2 className="text-3xl">Good Day!</h2>
      <div className="text-lg">{ new Date().toLocaleDateString() }</div>
    </div>
  );

}
