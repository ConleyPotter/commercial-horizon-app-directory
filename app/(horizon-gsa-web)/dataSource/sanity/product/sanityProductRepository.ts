import { sanityFetch } from "@/sanity/lib/fetch";
import { Product } from "@/app/(horizon-gsa-web)/domain/product/Product";
import { ProductCategory } from "@/app/(horizon-gsa-web)/domain/product/ProductCategory";
import { ProductRepository } from "@/app/(horizon-gsa-web)/domain/product/ProductRepository";
import { createClient } from "next-sanity";

class SanityProductRepository implements ProductRepository {
  sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2023-10-25",
    useCdn: true,
  });

  async getTopLevelProductCategories(): Promise<ProductCategory[]> {
    const query = `*[_type == "productCategory" && !defined(parentCategory)] {
      _id,
      title,
      "slug": slug.current,
      description,
      image {
        asset->{
          url,
          metadata
        }
      }, 
      seo {
        metaTitle,
        metaDescription
      }
    }`;

    const results = await this.sanityClient.fetch(query);
    return results.map((result: any) => this._mapToProductCategory(result));
  }
  async getChildCategoriesByParentSlug(
    parentCategorySlug: string
  ): Promise<ProductCategory> {
    const query = `
      *[_type == "productCategory" && parentCategory->slug.current == $parentCategorySlug] {
        _id,
        title,
        "slug": slug.current,
        description,
        image {
          asset->{
            url,
            metadata
          }
        },
        seo {
          metaTitle,
          metaDescription
        },
        "parentCategory": parentCategory->{
          _id,
          title,
          "slug": slug.current
        }
      }
    `;

    // Fetch the first child category with the provided parent slug
    const results = await this.sanityClient.fetch(query, {
      parentCategorySlug,
    });

    if (!results || results.length === 0) {
      throw new Error(
        `No child categories found for parent slug "${parentCategorySlug}".`
      );
    }

    // Map the first result to a ProductCategory object
    return this._mapToProductCategory(results[0]);
  }

  private _mapToProduct(data: any): Product {
    if (!data.productCategory) {
      throw new Error(`Product ${data.title} is missing a product category.`);
    }

    return {
      id: data._id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: data.price,
      images:
        data.images?.map((image: any) => ({
          url: image.asset.url,
          metadata: image.asset.metadata,
        })) ?? [],
      productCategory: data.productCategory,
    };
  }

  private _mapToProductCategory(data: any): ProductCategory {
    return {
      id: data._id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      image: {
        _type: "image",
        asset: {
          _ref: data.image.asset._ref, // Reference to the asset
          _type: "reference",
        },
      },
      seo: {
        metaTitle: data.seo.metaTitle,
        metaDescription: data.seo.metaDescription,
      },
    };
  }
}

export default SanityProductRepository;
