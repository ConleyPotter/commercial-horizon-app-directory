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
  console.log(params);

  return (
    <div>
      <h1></h1>
      <ul>test page</ul>
    </div>
  );
}
