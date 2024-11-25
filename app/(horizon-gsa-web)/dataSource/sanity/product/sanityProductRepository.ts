import { Product } from "@/app/(horizon-gsa-web)/domain/product/Product";
import { ProductCategory } from "@/app/(horizon-gsa-web)/domain/product/ProductCategory";
import { ProductRepository } from "@/app/(horizon-gsa-web)/domain/product/productRepository";

class SanityProductRepository implements ProductRepository {
  async getProductBySlug(slug: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async getProductCategories(): Promise<ProductCategory[]> {
    throw new Error("Method not implemented.");
  }
  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async getProducts() {
    return [];
  }
}
