import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

import { EMPTY_STRING, ErrorType, NOTIFICATION_LIFE } from 'shared/constants';
import { useError } from 'view/hooks/error';

export function NotificationContainer() {

  const toast = useRef(null);
  const [ serverError, cleanServerError ] = useError<{}>(ErrorType.SERVER);
  const [ validationError, cleanValidationError ] = useError<{}>(ErrorType.VALIDATION);

  useEffect(() => {
    let heading: string = 'Error';
    let errorMessage: string = EMPTY_STRING;

    if (serverError) {
      errorMessage = serverError.message;
    }

    if (validationError) {
      heading = 'Validation error';
      errorMessage = validationError.message;
    }

    if (errorMessage) {
      // @ts-ignore
      toast.current.show({
        severity: 'error',
        summary: heading,
        detail: errorMessage,
        life: NOTIFICATION_LIFE,
      });
    }

    return () => {
      cleanServerError();
      cleanValidationError();
    };
  }, [serverError, validationError]);

  return (
    <Toast
      position="bottom-left"
      ref={toast}
    />
  );

}
