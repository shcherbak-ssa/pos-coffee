import { Tag  } from 'primereact/tag';

import type { ProductCategory } from 'shared/types';

export type Props = {
  category: ProductCategory;
}

export function CategoryLabel({ category }: Props) {

  return (
    <Tag severity="info" value={category.name} />
  );

}
