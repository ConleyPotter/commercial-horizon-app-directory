import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";

export interface ProductRepository {
  getTopLevelProductCategories(): Promise<ProductCategory[]>;
  getChildCategoriesBySlug(
    parentCategorySlug: string
  ): Promise<ProductCategory[]>;
  getChildProductsBySlug(topLevelCategorySlug: string): Promise<Product[]>;
}
