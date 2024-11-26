import SanityProductRepository from "../dataSource/sanity/product/sanityProductRepository";

export default async function ProductsPage() {
  const SanityRepo = new SanityProductRepository();
  const topCategories = await SanityRepo.getTopLevelProductCategories();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {topCategories.map((category) => (
          <li key={category.id}>
            <a href={`/products/${category.slug}`}>{category.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
