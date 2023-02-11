import { Message } from 'primereact/message';

import type { ErrorObject } from 'shared/types';
import { EmptyComponent } from 'components/EmptyComponent';

export type Props = {
  clientError: ErrorObject<{}> | undefined;
}

export function LoginErrorMessage({ clientError }: Props) {

  if (clientError) {
    return (
      <Message
        className="mb-12 w-full"
        severity="error"
        text={clientError.message}
      />
    );
  }

  return <EmptyComponent />;

}
