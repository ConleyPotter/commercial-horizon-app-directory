export interface Product {
  id: string; // Sanity document ID
  title: string;
  slug: string; // Slug is stored as a string in Sanity
  productCategory: {
    _ref: string; // Sanity reference to the category
    _type: "reference";
  };
  description: string;
  price: number;
  images: Array<{
    _type: "image";
    asset: {
      _ref: string; // Reference to the image asset
      _type: "reference";
    };
    hotspot?: {
      x: number; // Hotspot coordinates for the image
      y: number;
      height: number;
      width: number;
    };
  }>;
}
