import { ScrollPanel } from 'primereact/scrollpanel';

import { AppLogo } from 'view/components/AppLogo';

import loginImage from '@login/view/assets/login-image.jpg';

export type Props = {
  children: React.ReactNode;
}

export function LoginWrapper({ children }: Props) {

  return (
    <div className="login-container full">
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="full xs:flex-center">
            <div className="login bg-white xs:rounded-xl shadow p-6 w-full h-full xs:h-auto">
              <div className="text-center mb-8">
                <AppLogo type="block" size="large" />
              </div>

              { children }
            </div>
          </div>

          <div
            className="login-image full hidden lg:block"
            style={{ backgroundImage: `url(${loginImage})` }}
          />
        </div>
      </ScrollPanel>
    </div>
  );

}
