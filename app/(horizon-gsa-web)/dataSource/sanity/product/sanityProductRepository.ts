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
  async getChildCategoriesBySlug(
    topLevelCategorySlug: string
  ): Promise<ProductCategory[]> {
    const query = `
      *[_type == "productCategory" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        image,
        seo,
        "children": *[_type == "productCategory" && parentCategory._ref == ^._id]
      }
    `;

    const result = await this.sanityClient.fetch(query, {
      slug: topLevelCategorySlug,
    });

    if (!result) {
      throw new Error(
        `Category with slug "${topLevelCategorySlug}" not found.`
      );
    }

    return result.children.map(this._mapToProductCategory);
  }
  async getChildProductsBySlug(
    topLevelCategorySlug: string
  ): Promise<Product[]> {
    const query = `
      *[_type == "productCategory" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        image,
        seo,
        "products": *[_type == "product" && productCategory._ref == ^._id]
      }
    `;

    const result = await this.sanityClient.fetch(query, {
      slug: topLevelCategorySlug,
    });

    if (!result) {
      throw new Error(
        `Category with slug "${topLevelCategorySlug}" not found.`
      );
    }

    return result.products.map(this._mapToProduct);
  }

  private _mapToProduct(data: any): Product {
    return {
      id: data._id,
      title: data.title,
      slug: data.slug.current,
      description: data.description,
      price: data.price,
      images: Array.isArray(data.images)
        ? data.images.map((image: any) => ({
            url: image.asset.url,
            metadata: image.asset.metadata,
          }))
        : [], // Return an empty array if data.images is not an array
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
