import { UsersInfoPageContainer } from '@admin/view/containers/UsersInfoPageContainer';

export type Props = {
  isEditMode?: boolean;
}

export function UsersInfoPage({ isEditMode = false }: Props) {

  return <UsersInfoPageContainer isEditMode={isEditMode} />;

}
