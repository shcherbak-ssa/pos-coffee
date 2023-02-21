import { useEffect, useState } from 'react';

import type { EmptyFunction, ErrorObject, NotificationService as BaseNotificationService } from 'shared/types';
import { EntityName, ErrorType } from 'shared/constants';
import { NotificationService } from 'services/notification';

export type ErrorObjectHook<T> = ErrorObject<T> | undefined;

export function useError<T>(
  errorType: ErrorType,
  entityName: EntityName = EntityName.ANY,
): [ErrorObjectHook<T>, EmptyFunction] {
  const [ error, setError ] = useState<ErrorObject<T>>();

  useEffect(() => {
    const notificationService: BaseNotificationService = NotificationService.create();
    notificationService.subscribeToError(errorType, handleError);

    return () => {
      notificationService.unsubscribeFromError(errorType, handleError);
    }
  }, []);

  function handleError(errorObject: ErrorObject<T>): void {
    if (errorObject.type === ErrorType.VALIDATION && entityName !== EntityName.ANY) {
      if (errorObject.entityName === entityName) {
        setError(errorObject);
      }

      return;
    }

    setError(errorObject);
  }

  function cleanError(): void {
    setError(undefined);
  }

  return [ error, cleanError ];
}
