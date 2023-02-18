import { UsersInfoPageContainer } from '@admin/view/containers/UsersInfoPageContainer';

export type Props = {
  isEditMode?: boolean;
}

export default function UsersInfoPage({ isEditMode = false }: Props) {

  return <UsersInfoPageContainer isEditMode={isEditMode} />;

}
