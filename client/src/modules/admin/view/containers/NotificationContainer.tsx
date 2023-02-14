import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

import { ErrorType, NOTIFICATION_LIFE } from 'shared/constants';
import { useError } from 'view/hooks/error';

export function NotificationContainer() {

  const toast = useRef(null);
  const [ serverError, cleanServerError ] = useError<{}>(ErrorType.SERVER);

  useEffect(() => {
    if (serverError && toast) {
      // @ts-ignore
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: serverError.message,
        life: NOTIFICATION_LIFE,
      });
    }

    return () => {
      cleanServerError();
    };
  }, [serverError]);

  return (
    <Toast
      position="bottom-left"
      ref={toast}
    />
  );

}
