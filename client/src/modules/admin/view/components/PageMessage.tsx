import { useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages';

import type { MessageType } from 'shared/types';

import { PageMessageContent } from '@admin/view/components/PageMessageContent';

export type Props = {
  message: string;
  type: MessageType;
}

export function PageMessage({ message, type }: Props) {

  const messages = useRef<Messages>(null);

  useEffect(() => {
    if (messages.current) {
      messages.current.show({
        sticky: true,
        closable: false,
        severity: type,
        content: <PageMessageContent type={type} message={message} />,
      });
    }
  }, []);

  return (
    <div className="p-6">
      <Messages ref={messages} />
    </div>
  );

}
