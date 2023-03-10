export type Props = {
  children: React.ReactNode;
}

export function CardListWrapper({ children }: Props) {

  return (
    <div className="flex flex-col gap-2 pb-2">
      { children }
    </div>
  );

}
