export interface ProductCategory {
  id: string; // Sanity document ID
  title: string;
  slug: string; // Slug for URL generation
  description: string; // Description of the category
  image?: {
    _type: "image";
    asset: {
      _ref: string; // Reference to the image asset
      _type: "reference";
    };
    hotspot?: {
      x: number; // Coordinates for image hotspot
      y: number;
      height: number;
      width: number;
    };
  }; // Make image optional if needed
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}
