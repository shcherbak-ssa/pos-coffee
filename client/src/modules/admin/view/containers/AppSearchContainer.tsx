import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import { PrimeIcons } from 'primereact/api';
import debounce from 'lodash.debounce';
import { InputText } from 'primereact/inputtext';

import { EMPTY_STRING, IS_ACTIVE_CLASSNAME } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { IconButton } from 'view/components/IconButton';

import type { AppStore, AppController } from '@admin/shared/types';
import { ControllerName, DEBOUNCE_TIMEOUT, PagePath, StoreName } from '@admin/shared/constants';
import { SearchResults } from '@admin/view/components/SearchResults';

export function AppSearchContainer() {

  const [ isSearchActive, setIsSearchActive ] = useState<boolean>(false);
  const [ searchString, setSearchString ] = useState<string>(EMPTY_STRING);

  const { state: { searchResults: searchResult } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const navigate: NavigateFunction = useNavigate();
  const debouncedResults = useMemo(() => debounce(handleInput, DEBOUNCE_TIMEOUT), []);

  const toUserInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);
  const toProductInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.PRODUCTS_INFO);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  useEffect(() => {
    if (isSearchActive && searchString !== EMPTY_STRING) {
      appController.search(searchString);
    }
  }, [searchString]);

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  function toCategoriesPage(): void {
    navigate(PagePath.CATEGORIES);

    toggleSearch();
  }

  function toUsersPage(): void {
    navigate(PagePath.USERS);

    toggleSearch();
  }

  function toUserPage(id: number): void {
    toUserInfoPage({ id });

    toggleSearch();
  }

  function toProductsPage(): void {
    navigate(PagePath.PRODUCTS);

    toggleSearch();
  }

  function toProductPage(id: number): void {
    toProductInfoPage({ id });

    toggleSearch();
  }

  function toggleSearch() {
    if (isSearchActive) {
      appController.resetSearch();
    }

    setIsSearchActive(!isSearchActive);
    setSearchString(EMPTY_STRING);
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>): void {
    setSearchString(e.target.value.trim());
  }

  function renderSearchInput(): React.ReactNode {
    if (isSearchActive) {
      return (
        <div>
          <InputText
            id="name"
            type="text"
            placeholder="Type something..."
            onChange={debouncedResults}
            autoFocus
          />
        </div>
      );
    }
  }

  function renderSearchResults(): React.ReactNode {
    if (isSearchActive && searchString !== EMPTY_STRING) {
      return (
        <SearchResults
          results={searchResult}
          toCategoriesPage={toCategoriesPage}
          toUsersPage={toUsersPage}
          toUserPage={toUserPage}
          toProductsPage={toProductsPage}
          toProductPage={toProductPage}
        />
      );
    }
  }

  return (
    <div>
      <div className="flex items-center gap-6 relative z-20">
        { renderSearchInput() }

        <IconButton
          className={isSearchActive ? IS_ACTIVE_CLASSNAME : ''}
          icon={isSearchActive ? PrimeIcons.TIMES : PrimeIcons.SEARCH}
          click={toggleSearch}
        />
      </div>

      { renderSearchResults() }
    </div>
  );

}
