// app/product-categories/page.tsx
import SanityProductRepository from "../dataSource/sanity/product/sanityProductRepository";
import { ProductCategory } from "@/app/(horizon-gsa-web)/domain/product/ProductCategory";

// Instantiate the repository
const productRepository = new SanityProductRepository();

interface ProductCategoriesPageProps {
  productCategories: ProductCategory[];
}

export default async function ProductCategoriesPage() {
  const productCategories: ProductCategory[] =
    await productRepository.getProductCategories();
  return (
    <div>
      <h1>Product Categories</h1>
      <ul>
        {productCategories.map((category) => (
          <li key={category.id}>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            {category.image && (
              <img
                src={category.image.asset._ref}
                alt={category.title}
                style={{ width: "200px", height: "auto" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
