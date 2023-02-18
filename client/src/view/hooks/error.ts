import { useEffect, useState } from 'react';

import type { EmptyFunction, ErrorObject, NotificationService as BaseNotificationService } from 'shared/types';
import type { ErrorType } from 'shared/constants';
import { NotificationService } from 'services/notification';

export type ErrorObjectHook<T> = ErrorObject<T> | undefined;

export function useError<T>(errorType: ErrorType): [ErrorObjectHook<T>, EmptyFunction] {
  const [ error, setError ] = useState<ErrorObject<T>>();

  useEffect(() => {
    const notificationService: BaseNotificationService = NotificationService.create();
    notificationService.subscribeToError(errorType, handleError);

    return () => {
      notificationService.unsubscribeFromError(errorType, handleError);
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
