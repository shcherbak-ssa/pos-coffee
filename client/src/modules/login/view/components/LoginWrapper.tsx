import { ScrollPanel } from 'primereact/scrollpanel';

import { AppLogo } from 'view/components/AppLogo';

import { LoginImage } from 'modules/login/view/components/LoginImage';

export type Props = {
  children: React.ReactNode;
}

export function LoginWrapper({ children }: Props) {

  return (
    <div className="bg-blue-50 full">
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="full xs:flex-center">
            <div className="login bg-white xs:rounded-xl shadow-md p-6 w-full h-full xs:h-auto">
              <div className="text-center mb-8">
                <AppLogo type="block" size="large" />
              </div>

              { children }
            </div>
          </div>

          <LoginImage />
        </div>
      </ScrollPanel>
    </div>
  );

}
