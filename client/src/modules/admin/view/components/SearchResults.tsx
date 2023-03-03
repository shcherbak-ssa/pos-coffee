import type { MouseEvent } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';

import type { EmptyFunction, ProductSchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type { SearchResults } from '@admin/shared/types';
import { PageMessage } from '@admin/view/components/PageMessage';
import { UsersCard } from '@admin/view/components/UsersCard';
import { ProductsCard } from '@admin/view/components/ProductsCard';
import { CategoryLabel } from '@admin/view/components/CategoryLabel';
import { SearchResultsHeading } from '@admin/view/components/SearchResultsHeading';

export type Props = {
  results: SearchResults | null;
  toCategoriesPage: EmptyFunction;
  toUsersPage: EmptyFunction;
  toUserPage: (id: number) => void;
  toProductsPage: EmptyFunction;
  toProductPage: (id: number) => void;
}

export function SearchResults({
  results,
  toCategoriesPage,
  toUsersPage,
  toUserPage,
  toProductsPage,
  toProductPage,
}: Props) {

  function isResultsEmpty(): boolean {
    if (results === null) {
      return true;
    }

    const { users, products, categories } = results;

    return (
      users.length === ZERO &&
      products.length === ZERO &&
      categories.length === ZERO
    );
  }

  function handleUserClick(e: MouseEvent, id: number): void {
    e.preventDefault();

    toUserPage(id);
  }

  function handleProductClick(e: MouseEvent, id: number): void {
    e.preventDefault();

    toProductPage(id);
  }

  function renderEmptyMessage(): React.ReactNode {
    if (isResultsEmpty()) {
      return (
        <PageMessage
          type="error"
          message="Nothing was found"
        />
      );
    }
  }

  function renderResults(): React.ReactNode {
    if (isResultsEmpty()) {
      return;
    }

    return (
      <ScrollPanel style={{ width: '100%', height: 'calc(100% - 96px)' }}>
        <div className="grid grid-cols-1 gap-6 py-12">
          { renderCategories() }
          { renderUsers() }
          { renderProducts() }
        </div>
      </ScrollPanel>
    );
  }

  function renderCategories(): React.ReactNode {
    if (results && results.categories.length) {
      return (
        <div className="mb-10">
          <SearchResultsHeading
            heading="Categories"
            click={toCategoriesPage}
          />

          <div className="flex flex-wrap gap-4">
            {
              results.categories.map(({ id, name }) => (
                <CategoryLabel category={{ id, name }} />
              ))
            }
          </div>
        </div>
      );
    }
  }

  function renderUsers(): React.ReactNode {
    if (results && results.users.length) {
      return (
        <div className="mb-10">
          <SearchResultsHeading
            heading="Users"
            click={toUsersPage}
          />

          <div className="grid grid-cols-3 gap-6">
            {
              results.users.map((user) => (
                <div className="click" onClick={(e) => handleUserClick(e, user.id)}>
                  <UsersCard entity={user} isSearchResult />
                </div>
              ))
            }
          </div>
        </div>
      );
    }
  }

  function renderProducts(): React.ReactNode {
    if (results && results.products.length) {
      return (
        <div>
          <SearchResultsHeading
            heading="Products"
            click={toProductsPage}
          />

          <div className="grid grid-cols-3 gap-6">
            {
              results.products.map(({ id, name, image, category }) => (
                <div className="click" onClick={(e) => handleProductClick(e, id)}>
                  <ProductsCard
                    entity={{
                      name,
                      image,
                      category: { id: ZERO, name: category }
                    } as ProductSchema}
                    isSearchResult
                  />
                </div>
              ))
            }
          </div>
        </div>
      );
    }
  }

  return (
    <div className="bg-white full fixed top-0 left-0 z-10">
      <div className="border-b-2 h-24 flex items-center px-8">
        <h2 className="text-xl">
          Search results
        </h2>
      </div>

      <div className="w-3/5 mx-auto overflow-hidden h-full">
        { renderEmptyMessage() }

        { renderResults() }
      </div>
    </div>
  );

}
