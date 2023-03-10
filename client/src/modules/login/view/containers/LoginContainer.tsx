import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import { ErrorType } from 'shared/constants';
import { loadContext } from 'view/helpers/load-context';
import { replaceUrl } from 'shared/utils/replace-url';
import { updatePageTitle } from 'shared/utils/page-title';
import { useError } from 'view/hooks/error';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { InputWrapper } from 'view/components/InputWrapper';

import type { LoginStore, LoginController, LoginSchema } from '@login/shared/types';
import { LOGIN_CONTROLLER, LOGIN_PAGE_PATH, LOGIN_PAGE_TITLE, LOGIN_STORE } from '@login/shared/constants';
import { LoginWrapper } from '@login/view/components/LoginWrapper';
import { LoginErrorMessage } from '@login/view/components/LoginErrorMessage';

export const LoginContainer = loadContext(Container, {
  stores: [ LOGIN_STORE ],
  controllers: [ LOGIN_CONTROLLER ],
});

function Container() {

  const [ isLoginProcessing, setIsLoginProcessing ] = useState<boolean>(false);
  const [ validationError, cleanValidationError ] = useError<LoginSchema>(ErrorType.VALIDATION);
  const [ clientError, cleanClientError ] = useError<{}>(ErrorType.CLIENT);

  const { state, login } = useStore(LOGIN_STORE) as LoginStore;
  const loginController = useController(LOGIN_CONTROLLER) as LoginController;

  useEffect(() => {
    replaceUrl(LOGIN_PAGE_PATH);
    updatePageTitle(LOGIN_PAGE_TITLE);
  }, []);

  async function processLogin(): Promise<void> {
    setIsLoginProcessing(true);

    cleanValidationError();
    cleanClientError();

    await loginController.processLogin(state.login);

    setIsLoginProcessing(false);
  }

  return (
    <LoginWrapper>
      <LoginErrorMessage clientError={clientError} />

      <div className="flex flex-col gap-8">
        <InputWrapper
          label="Email"
          valueKey="email"
          validationError={validationError}
        >
          <InputText
            id="email"
            type="text"
            value={state.login.email}
            onChange={(e) => login.email = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Password"
          valueKey="password"
          validationError={validationError}
        >
          <Password
            inputId="password"
            value={state.login.password}
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
