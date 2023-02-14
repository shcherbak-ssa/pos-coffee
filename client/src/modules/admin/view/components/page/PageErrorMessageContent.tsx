import { PrimeIcons } from 'primereact/api';

import { SimpleIcon } from 'view/components/SimpleIcon';

export type Props = {
  message: string;
}

export function PageErrorMessageContent({ message }: Props) {

  return (
    <div className="flex items-center">
      <SimpleIcon
        className="text-3xl"
        icon={PrimeIcons.TIMES_CIRCLE}
      />

      <div className="ml-6">
        <h3>Error</h3>
        <div>{ message }</div>
      </div>
    </div>
  );

}
