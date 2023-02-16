import { PrimeIcons } from 'primereact/api';

import type { Notification } from 'shared/types';
import { useMessageIcon } from 'view/hooks/message-icon';
import { SimpleIcon } from 'view/components/SimpleIcon';

export type Props = {
  type: 'result' | 'process';
  notification: Notification;
}

export function NotificationTemplate({ type, notification: { severity, heading, message } }: Props) {

  const icon: string = useMessageIcon(severity);

  return (
    <div className="flex items-center mr-auto">
      <div>
      <SimpleIcon
        className="text-2xl"
        icon={type === 'result' ? icon : PrimeIcons.SPINNER}
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
