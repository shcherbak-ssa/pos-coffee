export type Props = {
  children: React.ReactNode;
}

export function ProductsInfoWrapper({ children }: Props) {

  return (
    <div className="full p-6">
      <div className="grid grid-cols-3 gap-4">
        { children }
      </div>
    </div>
  );

}
