export type Props = {
  children: React.ReactNode;
}

export function PageElementWrapper({ children }: Props) {

  return (
    <div className="bg-white rounded-xl shadow">
      { children }
    </div>
  );

}
