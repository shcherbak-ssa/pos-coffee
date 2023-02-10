import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import type { LoginController, LoginSchema } from 'modules/login/types';
import { LOGIN_PAGE_TITLE } from 'modules/login/constants';

import { LoginWrapper } from 'modules/login/components/LoginWrapper';
import { LoginErrorMessage } from 'modules/login/components/LoginErrorMessage';

import { ControllerName, EMPTY_STRING, ErrorType, PagePath } from 'shared/constants';
import { replaceUrl, updatePageTitle } from 'shared/utils';
import { useController } from 'hooks/controller';
import { useError } from 'hooks/error';

import { InputWrapper } from 'components/InputWrapper';

export function LoginContainer() {

  const [ isLoginProcessing, setLoginProcessing ] = useState<boolean>(false);
  const [ username, setUsername ] = useState<string>(EMPTY_STRING);
  const [ password, setPassword ] = useState<string>(EMPTY_STRING);

  const [ validationError, cleanValidationError ] = useError<LoginSchema>(ErrorType.VALIDATION);
  const [ clientError, cleanClientError ] = useError<{}>(ErrorType.CLIENT);

  const loginController = useController<LoginController>(ControllerName.LOGIN);

  useEffect(() => {
    replaceUrl(PagePath.LOGIN);
    updatePageTitle(LOGIN_PAGE_TITLE);
  }, []);

  async function login(): Promise<void> {
    setLoginProcessing(true);

    cleanValidationError();
    cleanClientError();

    if (loginController) {
      await loginController.login({ username, password });
    }

    setLoginProcessing(false);
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
            className={classnames('w-full', {
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
    </LoginWrapper>
  );

}
