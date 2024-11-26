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

  async getProductBySlug(slug: string): Promise<Product> {
    const query = `*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      images[] {
        asset->{
          url,
          metadata
        }
      },
      "productCategory": productCategory->{
        _id,
        title,
        "slug": slug.current
      }
    }`;

    const result = await this.sanityClient.fetch(query, { slug });
    if (!result) {
      throw new Error(`Product with slug ${slug} not found`);
    }
    return this._mapToProduct(result);
  }

  async getProducts(): Promise<Product[]> {
    const query = `*[_type == "product"] {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      images[] {
        asset->{
          url,
          metadata
        }
      },
      "productCategory": productCategory->{
        _id,
        title,
        "slug": slug.current
      }
    }`;

    const results = await this.sanityClient.fetch(query);
    return results.map((result: any) => this._mapToProduct(result));
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    const query = `*[_type == "product" && productCategory._ref == $categoryId] {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      images[] {
        asset->{
          url,
          metadata
        }
      },
      "productCategory": productCategory->{
        _id,
        title,
        "slug": slug.current
      }
    }`;

    const results = await sanityFetch({
      query,
      params: { categoryId: category.id },
    });
    return results.map((result: any) => this._mapToProduct(result));
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    console.log("FETCHING PRODUCT CATEGORIES");
    const query = `*[_type == "productCategory"] {
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
    console.log("RESULTS", results);
    return results.map((result: any) => this._mapToProductCategory(result));
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
