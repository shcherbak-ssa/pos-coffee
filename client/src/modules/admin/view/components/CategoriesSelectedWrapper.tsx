import { CardWrapper } from '@admin/view/components/CardWrapper';

export type Props = {
  isCreateMode: boolean;
  children: React.ReactNode;
}

export function CategoriesSelectedWrapper({ isCreateMode, children }: Props) {

  if (isCreateMode) {
    return (
      <div className="full">
        { children }
      </div>
    );
  }

  return (
    <div className="full p-4">
      <CardWrapper className="full">
        { children }
      </CardWrapper>
    </div>
  );

}
