import { CardWrapper } from 'view/components/CardWrapper';
import { SimpleIcon } from 'view/components/SimpleIcon';

export type Props = {
  icon: string;
  label: string;
  value: React.ReactNode;
}

export function HomeStatWidget({ icon, label, value }: Props) {

  return (
    <CardWrapper>
      <div className="full flex items-center">
        <SimpleIcon
          className="text-3xl mr-4"
          icon={icon}
        />

        <div>
          <div className="text-sm">{ label }</div>
          <h3 className="text-2xl">{ value }</h3>
        </div>
      </div>
    </CardWrapper>
  );

}
