import { ScrollPanel } from 'primereact/scrollpanel';

export type Props = {
  children: React.ReactNode;
}

export function AppPageWrapper({ children }: Props) {

  return (
    <div style={{ height: 'calc(100% - 96px)' }}>
      <ScrollPanel style={{ width: 'calc(100% + 18px)', height: '100%' }}>
        <div className="full px-4 pb-4">
          { children }
        </div>
      </ScrollPanel>
    </div>
  );

}
