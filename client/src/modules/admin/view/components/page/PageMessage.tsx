import { useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages';

import type { MessageType } from 'shared/types';

import { MessageContent } from '@admin/view/components/MessageContent';

export type Props = {
  message: string;
  type: MessageType;
}

export function PageMessage({ message, type }: Props) {

  const messages = useRef(null);

  useEffect(() => {
    // @ts-ignore
    messages.current.show({
      sticky: true,
      closable: false,
      severity: type,
      content: <MessageContent type={type} message={message} />,
    });
  }, []);

  return (
    <div className="p-6">
      <Messages ref={messages} />
    </div>
  );

}
