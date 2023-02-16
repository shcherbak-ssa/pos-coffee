export type Props = {
  children: React.ReactNode;
}

export function PageSubSectionWrapper({ children }: Props) {

  return (
    <div className="border-b-2 px-6 py-4 flex items-center justify-between">
      { children }
    </div>
  );

}
