import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

import type { Notification, NotificationService as BaseNotificationService } from 'shared/types';
import { EMPTY_STRING, ErrorType, NOTIFICATION_LIFE } from 'shared/constants';
import { NotificationService } from 'services/notification';
import { useError } from 'view/hooks/error';

export function NotificationContainer() {

  const toast = useRef(null);
  const [ serverError, cleanServerError ] = useError<{}>(ErrorType.SERVER);
  const [ validationError, cleanValidationError ] = useError<{}>(ErrorType.VALIDATION);

  useEffect(() => {
    let heading: string = 'Error';
    let message: string = EMPTY_STRING;

    if (serverError) {
      message = serverError.message;
    }

    if (validationError) {
      heading = 'Validation error';
      message = validationError.message;
    }

    if (message) {
      showNotification({
        severity: 'error',
        heading,
        message,
      });
    }

    return () => {
      cleanServerError();
      cleanValidationError();
    };
  }, [serverError, validationError]);

  useEffect(() => {
    const notificationService: BaseNotificationService = NotificationService.create();
    notificationService.subscribeToNotification(handleNotification);

    return () => {
      notificationService.unsubscribeFromNoification(handleNotification);
    }
  }, []);

  function handleNotification(notification: Notification): void {
    showNotification(notification);
  }

  function showNotification(notification: Notification): void {
    // @ts-ignore
    toast.current.show({
      ...notification,
      summary: notification.heading,
      detail: notification.message,
      life: NOTIFICATION_LIFE,
    });
  }

  return (
    <Toast
      position="bottom-left"
      ref={toast}
    />
  );

}
