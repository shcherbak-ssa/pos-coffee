import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import type {
  Login as BaseLogin,
  LoginStore as BaseLoginStore,
  LoginController,
  LoginSchema,
} from 'modules/login/types';
import { LOGIN_PAGE_TITLE } from 'modules/login/constants';

import { LoginWrapper } from 'modules/login/components/LoginWrapper';
import { LoginErrorMessage } from 'modules/login/components/LoginErrorMessage';

import { ControllerName, ErrorType, PagePath, StoreName } from 'shared/constants';
import { Context } from 'shared/context';
import { loadContext } from 'shared/utils/load-context';
import { replaceUrl, updatePageTitle } from 'shared/utils';
import { useError } from 'hooks/error';
import { useStore } from 'hooks/store';

import { InputWrapper } from 'components/InputWrapper';

export const LoginContainer = loadContext(Container, {
  stores: [ StoreName.LOGIN ],
  controllers: [ ControllerName.LOGIN ],
});

function Container() {

  const [ isLoginProcessing, setIsLoginProcessing ] = useState<boolean>(false);
  const [ validationError, cleanValidationError ] = useError<LoginSchema>(ErrorType.VALIDATION);
  const [ clientError, cleanClientError ] = useError<{}>(ErrorType.CLIENT);

  const login: BaseLogin = useStore<BaseLoginStore>(StoreName.LOGIN, 'login');
  const loginController = Context.getController(ControllerName.LOGIN) as LoginController;

  useEffect(() => {
    replaceUrl(PagePath.LOGIN);
    updatePageTitle(LOGIN_PAGE_TITLE);
  }, []);

  async function processLogin(): Promise<void> {
    setIsLoginProcessing(true);

    cleanValidationError();
    cleanClientError();

    await loginController.processLogin(login);

    setIsLoginProcessing(false);
  }

  return (
    <LoginWrapper>
      <LoginErrorMessage clientError={clientError} />

      <div>
        <InputWrapper
          label="Username"
          errorMessage={validationError && validationError.errors.username}
        >
          <InputText
            id="username"
            className={classnames('w-full', {
              'p-invalid': validationError && validationError.errors.username,
            })}
            type="text"
            value={login.username}
            onChange={(e) => login.username = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Password"
          errorMessage={validationError && validationError.errors.password}
        >
          <Password
            inputId="password"
            className={classnames('w-full', {
              'p-invalid': validationError && validationError.errors.password,
            })}
            value={login.password}
            onChange={(e) => login.password = e.target.value}
            feedback={false}
            toggleMask
          />
        </InputWrapper>

        <Button
          className="w-full"
          label="Login"
          loading={isLoginProcessing}
          onClick={processLogin}
        />
      </div>
    </LoginWrapper>
  );

}
