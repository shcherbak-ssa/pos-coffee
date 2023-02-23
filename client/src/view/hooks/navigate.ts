import { type NavigateFunction, useNavigate } from 'react-router-dom';

import { setParamsToUrl } from 'shared/utils/url-params';

export type NavigateFunctionHook = <T extends object> (params: T) => void;

export function useNavigateWithParams(path: string): NavigateFunctionHook {

  const navigate: NavigateFunction = useNavigate();

  return <T extends object> (params: T): void => {
    const pathWithParams: string = setParamsToUrl(path, params);

    navigate(pathWithParams);
  }

}
