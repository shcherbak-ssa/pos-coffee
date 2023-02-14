import type { SelectItem } from 'primereact/selectitem';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { UserType } from 'shared/constants';
import { InputWrapper } from 'view/components/InputWrapper';

import type { UserSchema } from '@admin/shared/types';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';

export type Props = {
  user: UserSchema;
  isEditMode: boolean;
  className?: string;
}

export function UserProfileCard({ user, isEditMode, className }: Props) {

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
          // errorMessage={validationError && validationError.errors.email}
        >
          <InputText
            id="name"
            type="text"
            disabled={!isEditMode}
            value={user.name}
            // onChange={(e) => login.email = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Surname"
          // errorMessage={validationError && validationError.errors.email}
        >
          <InputText
            id="surname"
            type="text"
            disabled={!isEditMode}
            value={user.surname}
            // onChange={(e) => login.email = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Email"
          // errorMessage={validationError && validationError.errors.email}
        >
          <InputText
            id="email"
            type="text"
            disabled={!isEditMode}
            value={user.email}
            // onChange={(e) => login.email = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Phone"
          // errorMessage={validationError && validationError.errors.email}
        >
          <InputText
            id="phone"
            type="text"
            disabled={!isEditMode}
            value={user.phone}
            // onChange={(e) => login.email = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Type"
          // errorMessage={validationError && validationError.errors.email}
        >
          <Dropdown
            inputId="type"
            disabled={!isEditMode}
            value={{ label: user.type }}
            options={userTypeOptions()}
            optionLabel="label"
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  );

}
