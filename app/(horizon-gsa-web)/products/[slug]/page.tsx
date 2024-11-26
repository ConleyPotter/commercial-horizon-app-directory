import SanityProductRepository from "../../dataSource/sanity/product/sanityProductRepository";

export async function generateStaticParams() {
  const SanityRepo = new SanityProductRepository();
  const topLevelCategories = await SanityRepo.getTopLevelProductCategories();

  // Create an array of params
  const params = topLevelCategories.map((category) => ({
    slug: category.slug,
  }));

  return params;
}

interface Params {
  slug: string;
}

export default async function TopLevelCategoryPage({
  params,
}: {
  params: Params;
}) {
  const SanityRepo = new SanityProductRepository();

  const subCategoyProducts = await SanityRepo.getChildCategoriesBySlug(
    params.slug
  );

  const products = await SanityRepo.getChildProductsBySlug(params.slug);

  return (
    <div>
      <h1>{params.slug}</h1>
      <ul>
        {subCategoyProducts.map((product) => {
          return (
            <li key={product.id}>
              <a href={`/products/${params.slug}/${product.slug}`}>
                {product.title}
              </a>
            </li>
          );
        })}
        {products.map((product) => {
          return (
            <li key={product.id}>
              <a href={`/products/${params.slug}/${product.slug}`}>
                {product.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
