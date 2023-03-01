import { Tag  } from 'primereact/tag';

export type Props = {
  isAvailable: boolean;
}

export function AvailableLabel({ isAvailable }: Props) {

  return (
    <Tag
      value={(isAvailable ? 'Yes' : 'No').toUpperCase()}
      severity={isAvailable ? undefined : 'danger'}
    />
  );

}
