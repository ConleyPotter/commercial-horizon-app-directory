import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";

export interface ProductRepository {
  getTopLevelProductCategories(): Promise<ProductCategory[]>;
  getSubCategoriesByParentSlug(
    parentCategorySlug: string
  ): Promise<ProductCategory[]>;
  getProductCategoryBySlug(categorySlug: string): Promise<ProductCategory>;
  getSubCategoriesByParentSlug(
    parentCategorySlug: string
  ): Promise<ProductCategory[]>;
  getCategoryBySlug(slug: string): Promise<ProductCategory>;
  getProductBySlug(slug: string): Promise<Product>;
  getAllSubcategoriesAndProducts(): Promise<(ProductCategory | Product)[]>;
}
