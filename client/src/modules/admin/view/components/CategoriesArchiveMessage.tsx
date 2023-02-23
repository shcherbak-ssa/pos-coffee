import type { CategorySchema } from 'shared/types';

export type Props = {
  category: CategorySchema;
}

export function CategoriesArchiveMessage({ category }: Props) {

  return (
    <div>
      <p>This action will move { category.productsCount } products to DEFAULT category.</p>
      <p>Are you sure you want to archive this category?</p>
    </div>
  );

}
