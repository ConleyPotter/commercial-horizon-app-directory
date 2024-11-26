import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";

export interface ProductRepository {
  getChildCategoriesByParentSlug(
    parentCategorySlug: string
  ): Promise<ProductCategory>;
  getTopLevelProductCategories(): Promise<ProductCategory[]>;
}
