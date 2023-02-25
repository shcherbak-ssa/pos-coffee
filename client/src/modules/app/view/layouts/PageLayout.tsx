export type Props = {
  children: React.ReactNode;
}

export function PageLayout({ children }: Props) {

  return (
    <div className="full">
      { children }
    </div>
  );

}
