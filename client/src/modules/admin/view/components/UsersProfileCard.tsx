import classnames from 'classnames';
import type { SelectItem } from 'primereact/selectitem';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import type { UserSchema } from 'shared/types';
import { EMPTY_STRING, UserType, ZERO } from 'shared/constants';
import type { ErrorObjectHook } from 'view/hooks/error';
import { InputWrapper } from 'view/components/InputWrapper';

import type { UserDraft } from '@admin/shared/types';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';

export type Props = {
  user: UserSchema;
  draftUser: UserDraft;
  isEditMode: boolean;
  validationError: ErrorObjectHook<UserSchema>;
  className?: string;
}

export function UsersProfileCard({ user, draftUser, validationError, isEditMode, className }: Props) {

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
          errorMessage={validationError && validationError.errors.name}
        >
          <InputText
            id="name"
            type="text"
            className={classnames({
              'p-invalid': validationError && validationError.errors.name,
            })}
            disabled={!isEditMode}
            value={user.name}
            onChange={(e) => draftUser.name = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Surname"
          errorMessage={validationError && validationError.errors.surname}
        >
          <InputText
            id="surname"
            type="text"
            className={classnames({
              'p-invalid': validationError && validationError.errors.surname,
            })}
            disabled={!isEditMode}
            value={user.surname}
            onChange={(e) => draftUser.surname = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Email"
          errorMessage={validationError && validationError.errors.email}
        >
          <InputText
            id="email"
            type="text"
            className={classnames({
              'p-invalid': validationError && validationError.errors.email,
            })}
            disabled={!isEditMode}
            value={user.email}
            onChange={(e) => draftUser.email  = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Phone"
          errorMessage={validationError && validationError.errors.phone}
        >
          <InputText
            id="phone"
            type="text"
            keyfilter="int"
            className={classnames({
              'p-invalid': validationError && validationError.errors.phone,
            })}
            disabled={!isEditMode}
            value={user.phone}
            onChange={(e) => draftUser.phone = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Type"
          errorMessage={validationError && validationError.errors.type}
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
