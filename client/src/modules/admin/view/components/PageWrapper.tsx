export type Props = {
  children: React.ReactNode;
}

export function PageWrapper({ children }: Props) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      { children }
    </div>
  );

}
