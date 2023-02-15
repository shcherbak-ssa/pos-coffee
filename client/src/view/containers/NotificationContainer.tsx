import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

import type { Notification, NotificationService as BaseNotificationService } from 'shared/types';
import { EMPTY_STRING, ErrorType, NOTIFICATION_LIFE } from 'shared/constants';
import { NotificationService } from 'services/notification';
import { useError } from 'view/hooks/error';
import { NotificationTemplate } from 'view/components/NotificationTemplate';

export function NotificationContainer() {

  const toastResult = useRef(null);
  const toastProgress = useRef(null);

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

  function showNotification({ type, ...notification }: Notification): void {
    if (!type || type === 'result') {
      // @ts-ignore
      toastResult.current.show({
        ...notification,
        summary: notification.heading,
        detail: notification.message,
        life: NOTIFICATION_LIFE,
        content: <NotificationTemplate type="result" notification={notification} />,
      });

      // @ts-ignore
      toastProgress.current.clear();
      return;
    }

    if (type === 'process') {
      // @ts-ignore
      toastProgress.current.show({
        ...notification,
        summary: notification.heading,
        detail: notification.message,
        life: NOTIFICATION_LIFE,
        content: <NotificationTemplate type="process" notification={notification} />,
      });
    }
  }

  return (
    <>
      <Toast position="bottom-left" ref={toastResult} />
      <Toast position="bottom-left" ref={toastProgress} />
    </>
  );

}
