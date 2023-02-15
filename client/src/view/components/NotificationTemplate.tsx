import { PrimeIcons } from 'primereact/api';

import type { Notification } from 'shared/types';
import { SimpleIcon } from 'view/components/SimpleIcon';

export type Props = {
  type: 'result' | 'process';
  notification: Notification;
}

export function NotificationTemplate({ type, notification: { severity, heading, message } }: Props) {

  function getNotificationIcon(): string {
    switch (severity) {
      case 'success':
        return PrimeIcons.CHECK_CIRCLE;
      case 'info':
        return PrimeIcons.INFO_CIRCLE;
      case 'warn':
        return PrimeIcons.EXCLAMATION_TRIANGLE;
      case 'error':
        return PrimeIcons.TIMES_CIRCLE;
      default:
        return PrimeIcons.INFO;
    }
  }

  return (
    <div className="flex items-center mr-auto">
      <div>
      <SimpleIcon
        className="text-2xl"
        icon={type === 'result' ? getNotificationIcon() : PrimeIcons.SPINNER}
        spin={type === 'process'}
      />
      </div>

      <div className="ml-4">
        <h3>{ heading }</h3>
        <p>{ message }</p>
      </div>
    </div>
  );

}
