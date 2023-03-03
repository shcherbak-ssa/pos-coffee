import type { ChangeEvent, MouseEvent } from 'react';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { EMPTY_STRING } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { CartController, CartStore } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';

export function CartSearchContainer() {

  const { state: { searchString } } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  function handleInput(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();

    cartController.setSearchString(e.target.value);
  }

  function clearSearch(e: MouseEvent): void {
    e.preventDefault();

    cartController.setSearchString(EMPTY_STRING);
  }

  return (
    <div>
      <div className="p-inputgroup">
        <InputText
          placeholder="Product name"
          value={searchString}
          onChange={handleInput}
        />

        <Button
          className=""
          icon={searchString === EMPTY_STRING ? PrimeIcons.SEARCH : PrimeIcons.TIMES}
          onClick={clearSearch}
        />
      </div>
    </div>
  );

}
