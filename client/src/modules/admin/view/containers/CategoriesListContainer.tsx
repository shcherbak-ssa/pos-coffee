import { useEffect } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { DataTable, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column, type ColumnProps } from 'primereact/column';

import type { CategorySchema, EmptyFunction } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { useError } from 'view/hooks/error';

import type { CategoriesController, CategoriesStore, EntityViewComponentProps } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';
import { CategoriesSelectCategoryMessage } from '@admin/view/components/CategoriesSelectCategoryMessage';
import { useActionsMenuItems } from '@admin/view/hooks/actions-menu-items';
import { CategoriesSelectedCategory } from '@admin/view/components/CategoriesSelectedCategory';

export type Props = EntityViewComponentProps<CategorySchema> & {
  isEditMode: boolean;
  isLoading: boolean;
  saveCategory: (category: CategorySchema) => void;
  removeEditMode: EmptyFunction;
};

export function CategoriesListContainer({
  entities: categories,
  selectedEntities,
  setSelectedEntities,
  actionsMenuItemsProps,
  isEditMode,
  isLoading,
  saveCategory,
  removeEditMode,
}: Props) {

  const { state: { selected: selectedCategory }, draft: draftCategory }
    = useStore(StoreName.CATEGORIES) as CategoriesStore;

  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;
  const [ validationError, cleanValidationError ] = useError<CategorySchema>(ErrorType.VALIDATION);

  const actionsMenuItems: MenuItem[] = useActionsMenuItems({
    ...actionsMenuItemsProps,
    isEntityPage: false,
    entity: selectedCategory,
  });

  const columnsProps: ColumnProps[] = [
    getSelectionColumn(),
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'products',
      header: 'Products',
      body: <div>@TODO</div>
    },
  ];

  useEffect(() => () => cleanValidationError(), []);

  useEffect(() => {
    cleanValidationError();
  }, []);

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

    removeEditMode();
  }

  function getSelectionColumn(): ColumnProps {
    return {
      field: 'selection',
      selectionMode: undefined,
      headerStyle: { width: '0', padding: '0' },
    };
  }

  function drawSelectedCategory(): React.ReactNode {
    if (selectedCategory && (selectedEntities.length || isEditMode)) {
      return (
        <CategoriesSelectedCategory
          entity={selectedCategory}
          entityDraft={draftCategory}
          validationError={validationError}
          isEditMode={isEditMode}
          isLoading={isLoading}
          actionsMenuItems={actionsMenuItems}
          saveCategory={saveCategory}
          removeEditMode={removeEditMode}
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

      <div className="border-l-2 w-80 min-h-full">
        { drawSelectedCategory() }
      </div>
    </div>
  );

}
