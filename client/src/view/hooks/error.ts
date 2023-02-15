import { useEffect, useState } from 'react';

import type { ErrorObject, ErrorService as BaseErrorService } from 'shared/types';
import type { ErrorType } from 'shared/constants';
import { ErrorService } from 'services/error';

export type ErrorObjectHook<T> = ErrorObject<T> | undefined;

export function useError<T>(errorType: ErrorType): [ErrorObjectHook<T>, () => void] {
  const [ error, setError ] = useState<ErrorObject<T>>();

  useEffect(() => {
    const errorService: BaseErrorService = ErrorService.create();
    errorService.subscribe(errorType, handleError);

    return () => {
      errorService.unsubscribe(errorType, handleError);
    }
  }, []);

  function handleError(errorObject: ErrorObject<T>): void {
    setError(errorObject);
  }

  function cleanError(): void {
    setError(undefined);
  }

  return [ error, cleanError ];
}
