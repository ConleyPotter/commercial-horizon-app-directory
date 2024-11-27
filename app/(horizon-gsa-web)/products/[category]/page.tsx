import SanityProductRepository from "../../dataSource/sanity/product/sanityProductRepository";

export async function generateStaticParams() {
  const SanityRepo = new SanityProductRepository();
  const categories = await SanityRepo.getTopLevelProductCategories();

  return categories.map((category) => ({
    category: typeof category.slug === 'string' ? category.slug : category.slug.current,
  }));
}
export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const SanityRepo = new SanityProductRepository();

  const category = await SanityRepo.getCategoryBySlug(params.category);
  const subcategories = await SanityRepo.getSubCategoriesByParentSlug(params.category);
  const products = await SanityRepo.getProductsByCategorySlug(params.category);

  return (
    <div>
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <h2>Subcategories</h2>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id}>
            <a
              href={`/products/${params.category}/${typeof subcategory.slug === 'string' ? subcategory.slug : subcategory.slug.current}`}
            >
              {subcategory.title}
            </a>
          </li>
        ))}
      </ul>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/products/${params.category}/${typeof product.slug === 'string' ? product.slug : product.slug.current}`}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
