import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { ScrollPanel } from 'primereact/scrollpanel';

import type { LoginController as BaseLoginController, LoginSchema } from 'shared/types';
import { EMPTY_STRING, ErrorType } from 'shared/constants';
import { replaceUrl, updatePageTitle } from 'shared/utils';
import { LoginController } from 'controllers/login';
import { useError } from 'view/hooks/error';

import loginImage from 'view/assets/images/login-image.jpg';
import { InputWrapper } from 'view/components/InputWrapper';
import { AppLogo } from 'view/components/AppLogo';

const LOGIN_URL: string = '/login';
const LOGIN_PAGE_TITLE: string = 'Login';

export function LoginContainer() {

  const [ isLoginProcessing, setLoginProcessing ] = useState(false);
  const [ username, setUsername ] = useState(EMPTY_STRING);
  const [ password, setPassword ] = useState(EMPTY_STRING);

  const [ validationError, cleanValidationError ] = useError<LoginSchema>(ErrorType.VALIDATION);
  const [ clientError, cleanClientError ] = useError(ErrorType.CLIENT);

  useEffect(() => {
    replaceUrl(LOGIN_URL);
    updatePageTitle(LOGIN_PAGE_TITLE);
  }, []);

  async function login(): Promise<void> {
    setLoginProcessing(true);

    cleanValidationError();
    cleanClientError();

    const controller: BaseLoginController = LoginController.create();
    await controller.login({ username, password });

    setLoginProcessing(false);
  }

  return (
    <div className="bg-blue-50 full">
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="full xs:flex-center">
            <div className="login bg-white xs:rounded-xl shadow-md p-6 w-full h-full xs:h-auto">
              <div className="text-center mb-8">
                <AppLogo type="block" size="large" />
              </div>

              {
                clientError
                  ? <Message
                      className="mb-12 w-full"
                      severity="error"
                      text={clientError.message}
                    />
                  : EMPTY_STRING
              }

              <div>
                <InputWrapper
                  label="Username"
                  errorMessage={validationError && validationError.errors.username}
                >
                  <InputText
                    id="username"
                    className={classNames('w-full', {
                      'p-invalid': validationError && validationError.errors.username,
                    })}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputWrapper>

                <InputWrapper
                  label="Password"
                  errorMessage={validationError && validationError.errors.password}
                >
                  <Password
                    inputId="password"
                    className={classNames('w-full', {
                      'p-invalid': validationError && validationError.errors.password,
                    })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    feedback={false}
                    toggleMask
                  />
                </InputWrapper>

                <Button
                  className="w-full"
                  label="Login"
                  loading={isLoginProcessing}
                  onClick={login}
                />
              </div>
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
