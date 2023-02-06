import { ProgressSpinner } from 'primereact/progressspinner';

export function AppLoader() {

  return (
    <div className="app-loader full flex-center">
      <ProgressSpinner style={{ width: '64px', height: '64px' }} strokeWidth="2" />
    </div>
  );

}
