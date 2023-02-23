import type { MessageType } from 'shared/types';
import { useMessageIcon } from 'view/hooks/message-icon';
import { SimpleIcon } from 'view/components/SimpleIcon';

export type Props = {
  message: string;
  type: MessageType;
}

export function PageMessageContent({ message, type }: Props) {

  const icon: string = useMessageIcon(type);

  return (
    <div className="flex items-center">
      <SimpleIcon
        className="text-3xl"
        icon={icon}
      />

      <div className="ml-6">
        <div>{ message }</div>
      </div>
    </div>
  );

}
