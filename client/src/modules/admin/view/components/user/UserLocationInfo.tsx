import classnames from 'classnames';
import { InputText } from 'primereact/inputtext';

import type { ErrorObjectHook } from 'view/hooks/error';
import { InputWrapper } from 'view/components/InputWrapper';

import type { UserDraft, UserSchema } from '@admin/shared/types';
import { LocationCard } from '@admin/view/components/card/LocationCard';

export type Props = {
  user: UserSchema;
  draftUser: UserDraft;
  isEditMode: boolean;
  validationError: ErrorObjectHook<UserSchema>;
  className?: string;
}

export function UserLocationInfo({ user, draftUser, validationError, isEditMode, className }: Props) {

  return (
    <LocationCard className={className}>
      <InputWrapper
        label="Country"
        // errorMessage={validationError && validationError.errors.name}
      >
        <InputText
          id="country"
          type="text"
          className={classnames({
            // 'p-invalid': validationError && validationError.errors.name,
          })}
          disabled={!isEditMode}
          // value={user.name}
          // onChange={(e) => draftUser.name = e.target.value}
        />
      </InputWrapper>

      <InputWrapper
        label="State"
        // errorMessage={validationError && validationError.errors.name}
      >
        <InputText
          id="state"
          type="text"
          className={classnames({
            // 'p-invalid': validationError && validationError.errors.name,
          })}
          disabled={!isEditMode}
          // value={user.name}
          // onChange={(e) => draftUser.name = e.target.value}
        />
      </InputWrapper>

      <InputWrapper
        label="City"
        // errorMessage={validationError && validationError.errors.name}
      >
        <InputText
          id="city"
          type="text"
          className={classnames({
            // 'p-invalid': validationError && validationError.errors.name,
          })}
          disabled={!isEditMode}
          // value={user.name}
          // onChange={(e) => draftUser.name = e.target.value}
        />
      </InputWrapper>

      <InputWrapper
        label="Zip code"
        // errorMessage={validationError && validationError.errors.name}
      >
        <InputText
          id="zip"
          type="text"
          className={classnames({
            // 'p-invalid': validationError && validationError.errors.name,
          })}
          disabled={!isEditMode}
          // value={user.name}
          // onChange={(e) => draftUser.name = e.target.value}
        />
      </InputWrapper>

      <InputWrapper
        className="col-span-2"
        label="Address"
        // errorMessage={validationError && validationError.errors.name}
      >
        <InputText
          id="address"
          type="text"
          className={classnames({
            // 'p-invalid': validationError && validationError.errors.name,
          })}
          disabled={!isEditMode}
          // value={user.name}
          // onChange={(e) => draftUser.name = e.target.value}
        />
      </InputWrapper>
    </LocationCard>
  );

}
