import { InputText } from 'primereact/inputtext';

import type { AddressDraft, AddressSchema } from 'shared/types';
import { InputWrapper } from 'view/components/InputWrapper';
import { EmptyComponent } from 'view/components/EmptyComponent';
import { CardHeading } from 'view/components/CardHeading';

import type { CardWithInputsProps } from '@admin/shared/types';
import { CardWrapper } from 'view/components/CardWrapper';

export type Props = CardWithInputsProps<AddressSchema, AddressDraft>;

export function AddressCard({
  entity: address,
  entityDraft: draftAddress,
  validationError,
  isEditMode,
  className,
}: Props) {

  if (address === null) {
    return <EmptyComponent />;
  }

  return (
    <CardWrapper className={className}>
      <CardHeading heading="Address" />

      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        <InputWrapper
          label="Country"
          valueKey="country"
          validationError={validationError}
        >
          <InputText
            id="country"
            type="text"
            disabled={!isEditMode}
            value={address.country}
            onChange={(e) => draftAddress.country = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="State"
          valueKey="state"
          validationError={validationError}
        >
          <InputText
            id="state"
            type="text"
            disabled={!isEditMode}
            value={address.state}
            onChange={(e) => draftAddress.state = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="City"
          valueKey="city"
          validationError={validationError}
        >
          <InputText
            id="city"
            type="text"
            disabled={!isEditMode}
            value={address.city}
            onChange={(e) => draftAddress.city = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="Zip code"
          valueKey="zipCode"
          validationError={validationError}
        >
          <InputText
            id="zip"
            type="text"
            disabled={!isEditMode}
            value={address.zipCode}
            onChange={(e) => draftAddress.zipCode = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          className="col-span-2"
          label="Address"
          valueKey="address"
          validationError={validationError}
        >
          <InputText
            id="address"
            type="text"
            disabled={!isEditMode}
            value={address.address}
            onChange={(e) => draftAddress.address = e.target.value}
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  );

}
