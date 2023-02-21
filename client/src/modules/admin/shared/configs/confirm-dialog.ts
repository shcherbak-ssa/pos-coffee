import type { ConfirmDialogProps } from 'primereact/confirmdialog';
import { PrimeIcons } from 'primereact/api';

export const confirmDialogConfig: {
  archive: ConfirmDialogProps;
  restore: ConfirmDialogProps;
} = {
  archive: {
    header: 'Archive',
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    acceptClassName: 'p-button-danger',
  },
  restore: {
    header: 'Restore',
    icon: PrimeIcons.INFO_CIRCLE,
  },
};
