import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { setParamsToUrl } from 'shared/utils';

export type NavigateFunctionHook = <T extends object, S> (params: T, state?: S) => void;

export function useNavigateWithParams(path: string): NavigateFunctionHook {

  const navigate: NavigateFunction = useNavigate();

  return <T extends object, S = {}> (params: T, state?: S): void => {
    const pathWithParams: string = setParamsToUrl(path, params);

    navigate(pathWithParams, { state });
  }

}
