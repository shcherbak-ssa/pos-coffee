import { PrimeIcons } from 'primereact/api';

import type { MessageType } from 'shared/types';

export function useMessageIcon(severity: MessageType): string {
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
