import type { SelectItem } from 'primereact/selectitem';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import type { UserSchema } from 'shared/types';
import { EMPTY_STRING, UserType, ZERO } from 'shared/constants';
import { InputWrapper } from 'view/components/InputWrapper';
import { CardHeading } from 'view/components/CardHeading';

import type { CardWithInputsProps, UserDraft } from '@admin/shared/types';
import { CardWrapper } from '@admin/view/components/CardWrapper';

export type Props = CardWithInputsProps<UserSchema, UserDraft>;

export function UsersProfileCard({
  entity: user,
  entityDraft: draftUser,
  validationError,
  isEditMode,
  className,
}: Props) {

  function userTypeOptions(): SelectItem[] {
    const userTypes: UserType[] = [
      UserType.ADMIN,
      UserType.MANAGER,
      UserType.WAITER,
    ];

    return userTypes.map((type) => ({ label: type }));
  }

  return (
    <CardWrapper className={className}>
      <CardHeading heading="Profile" />

      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        <InputWrapper
          label="Name"
          valueKey="name"
          validationError={validationError}
        >
          <InputText
            id="name"
            type="text"
            disabled={!isEditMode}
            value={user.name}
            onChange={(e) => draftUser.name = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Surname"
          valueKey="surname"
          validationError={validationError}
        >
          <InputText
            id="surname"
            type="text"
            disabled={!isEditMode}
            value={user.surname}
            onChange={(e) => draftUser.surname = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Email"
          valueKey="email"
          validationError={validationError}
        >
          <InputText
            id="email"
            type="text"
            disabled={!isEditMode}
            value={user.email}
            onChange={(e) => draftUser.email  = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Phone"
          valueKey="phone"
          validationError={validationError}
        >
          <InputText
            id="phone"
            type="text"
            keyfilter="int"
            disabled={!isEditMode}
            value={user.phone}
            onChange={(e) => draftUser.image = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Type"
          valueKey="type"
          validationError={validationError}
          description={isEditMode && user.id !== ZERO ? 'Cannot change the type of an existing user' : EMPTY_STRING}
        >
          <Dropdown
            inputId="type"
            disabled={!isEditMode || (isEditMode && user.id !== ZERO)}
            value={{ label: user.type }}
            onChange={(e) => draftUser.type = e.value.label}
            options={userTypeOptions()}
            optionLabel="label"
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  );

}
