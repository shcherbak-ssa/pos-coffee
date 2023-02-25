import { useEffect } from 'react';
import { DataTable, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column, type ColumnProps } from 'primereact/column';

import type { CategorySchema as BaseCategorySchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppStore, CategoriesController, CategoriesStore } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';
import { useSelectedEntities } from '@admin/view/hooks/select-entities';
import { CategoriesSelectCategoryMessage } from '@admin/view/components/CategoriesSelectCategoryMessage';
import { CategoriesSelectedContainer } from '@admin/view/containers/CategoriesSelectedContainer';
import { AvailableLabel } from '@admin/view/components/AvailableLabel';

export type Props = {}

export function CategoriesListContainer({}: Props) {

  const { state: { selected: selectedCategory } } = useStore(StoreName.CATEGORIES) as CategoriesStore;
  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;

  const { state: { view } } = useStore(StoreName.APP) as AppStore;
  const { state: { list: categories, isPopupOpen } } = useStore(StoreName.CATEGORIES) as CategoriesStore;

  const [ isSelected, selectedEntities, setSelectedEntities ] = useSelectedEntities<BaseCategorySchema>({ view });

  const columnsProps: ColumnProps[] = [
    {
      field: 'selection',
      selectionMode: undefined,
      headerStyle: { width: '0', padding: '0' },
    },
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
    setSelectedEntities([]);
    categoriesController.select();
  }, [view.listTab, isPopupOpen]);

  function selectEntities({ value }: DataTableSelectionChangeEvent<BaseCategorySchema[]>): void {
    // @ts-ignore
    setSelectedEntities([value]);
    // @ts-ignore
    categoriesController.select(value.id);

    // cancel();
  }

  function drawSelectedCategory(): React.ReactNode {
    if (selectedCategory && selectedCategory.id !== ZERO) {
      return <CategoriesSelectedContainer mode="edit" />;
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
