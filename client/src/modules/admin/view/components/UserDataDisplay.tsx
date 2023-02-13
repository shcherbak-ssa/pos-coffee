export type Props = {
  icon: string;
  value: string;
}

export function UserDataDisplay({ icon, value }: Props) {

  return (
    <div className="flex items-start justify-between py-3 px-4">
      <div className="flex items-center gap-2">
        <span className={icon} />
        <span>{ value }</span>
      </div>
    </div>
  );

}
