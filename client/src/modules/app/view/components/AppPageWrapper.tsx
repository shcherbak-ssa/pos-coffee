export type Props = {
  children: React.ReactNode;
}

export function AppPageWrapper({ children }: Props) {

  return (
    <div className="pt-4" style={{ height: 'calc(100% - 64px)' }}>
      { children }
    </div>
  );

}
