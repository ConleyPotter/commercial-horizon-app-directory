import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";

export interface ProductRepository {
  getProductBySlug(slug: string): Promise<Product>;
  getProductCategories(): Promise<ProductCategory[]>;
  getProductsByCategory(category: ProductCategory): Promise<Product[]>;
  getProducts(): Promise<Product[]>;
}
