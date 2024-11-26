import { ProductCategory } from "@/sanity.types";

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: { url: string; metadata: any }[];
  productCategory: ProductCategory;
}
