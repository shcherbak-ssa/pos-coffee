import { useEffect } from 'react';
import { DataTable, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column, type ColumnProps } from 'primereact/column';

import type { CategorySchema, EmptyFunction } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { CategoriesController, CategoriesStore, EntityViewComponentProps } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';
import { CategoriesSelectCategoryMessage } from '@admin/view/components/CategoriesSelectCategoryMessage';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { CategoriesSelectedContainer } from '@admin/view/containers/CategoriesSelectedContainer';
import { AvailableLabel } from '@admin/view/components/AvailableLabel';

export type Props = Omit<EntityViewComponentProps<CategorySchema>, 'actionsMenuItemsProps'> & {
  actionsMenuItemsProps: ActionsMenuItemsProps;
  isEditMode: boolean;
  isLoading: boolean;
  saveCategory: (category: CategorySchema) => void;
  cancel: EmptyFunction;
};

export function CategoriesListContainer({
  entities: categories,
  selectedEntities,
  setSelectedEntities,
  actionsMenuItemsProps,
  isEditMode,
  isLoading,
  saveCategory,
  cancel,
}: Props) {

  const { state: { selected: selectedCategory } } = useStore(StoreName.CATEGORIES) as CategoriesStore;
  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;

  const columnsProps: ColumnProps[] = [
    getSelectionColumn(),
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'productsCount',
      header: 'Products',
    },
    {
      field: 'isAvailable',
      header: 'Available',
      body: AvailableLabel,
    },
  ];

  useEffect(() => {
    if (!categories.map(({ id }) => id).includes(selectedCategory.id)) {
      setSelectedEntities([]);
      categoriesController.select();
    }
  }, [categories]);

  function selectEntities({ value }: DataTableSelectionChangeEvent<CategorySchema[]>): void {
    // @ts-ignore
    setSelectedEntities([value]);
    // @ts-ignore
    categoriesController.select(value.id);

    cancel();
  }

  function getSelectionColumn(): ColumnProps {
    return {
      field: 'selection',
      selectionMode: undefined,
      headerStyle: { width: '0', padding: '0' },
    };
  }

  function drawSelectedCategory(): React.ReactNode {
    if (selectedCategory && selectedCategory.id !== ZERO && (selectedEntities.length || isEditMode)) {
      return (
        <CategoriesSelectedContainer
          mode="edit"
          actionsMenuItemsProps={actionsMenuItemsProps}
          isEditMode={isEditMode}
          isLoading={isLoading}
          saveCategory={saveCategory}
          cancel={cancel}
        />
      );
    }

    return <CategoriesSelectCategoryMessage />;
  }

  return (
    <div className="full flex">
      <DataTable
        className="grow"
        dataKey="id"
        value={categories}
        responsiveLayout="scroll"
        selectionMode="single"
        selection={selectedEntities}
        onSelectionChange={selectEntities}
      >
        { columnsProps.map((props) => <Column key={props.field} {...props} />) }
      </DataTable>

      <div className="border-l-2 w-96 min-h-full">
        { drawSelectedCategory() }
      </div>
    </div>
  );

}
