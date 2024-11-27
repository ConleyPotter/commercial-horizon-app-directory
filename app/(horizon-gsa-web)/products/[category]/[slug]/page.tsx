import SanityProductRepository from "@/app/(horizon-gsa-web)/dataSource/sanity/product/sanityProductRepository";

export async function generateStaticParams() {
  const SanityRepo = new SanityProductRepository();

  const items = await SanityRepo.getAllSubcategoriesAndProducts();

  return items.map((item) => ({
    category: item.slug,
    slug: typeof item.slug === "string" ? item.slug : item.slug.current,
  }));
}

export default async function CategoryOrProductPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const SanityRepo = new SanityProductRepository();
  // Check if the slug represents a subcategory or a product
  const subcategory = await SanityRepo.getCategoryBySlug(params.slug);
  const product = !subcategory
    ? await SanityRepo.getProductBySlug(params.slug)
    : null;

  if (subcategory) {
    return (
      <div>
        <h1>{subcategory.title}</h1>
        <p>{subcategory.description}</p>
        {/* Render products or child categories */}
      </div>
    );
  }

  if (product) {
    return (
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        {/* Render product details */}
      </div>
    );
  }

  return <p>404: Not Found</p>;
}
