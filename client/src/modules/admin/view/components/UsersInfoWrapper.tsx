export type Props = {
  children: React.ReactNode;
}

export function UsersInfoWrapper({ children }: Props) {

  return (
    <div className="full p-6">
      <div className="grid grid-cols-4 gap-4 full">
        { children }
      </div>
    </div>
  );

}
