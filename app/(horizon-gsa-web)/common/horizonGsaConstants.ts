interface ProductCategoryInterfacae {
  slug: string;
  title: string;
  seoData: {
    title: string;
    description: string;
    image: string;
  };
}

export const productCategories: ProductCategoryInterfacae[] = [
  {
    slug: "dog-kennels",
    title: "Horizon Structures Dog Kennels",
    seoData: {
      title: "Dog Kennels",
      description: "Dog Kennels",
      image: "",
    },
  },
  {
    slug: "timber-frame",
    title: "Timber Frame",
    seoData: {
      title: "Timber Frame Structures",
      description: "Timber Frame Structures",
      image: "",
    },
  },
  {
    slug: "horse-barns",
    title: "Horse Barns",
    seoData: {
      title: "Horse Barns",
      description: "Timber Frame Horse Barn Structures",
      image: "",
    },
  },
  {
    slug: "chicken-coops",
    title: "Chicken Coops",
    seoData: {
      title: "Chicken Coops",
      description: "Chicken Coops",
      image: "",
    },
  },
  {
    slug: "prebuilt-greenhouses",
    title: "Prebuilt Greenhouses",
    seoData: {
      title: "Prebuilt Greenhouses",
      description: "Prebuilt Greenhouses",
      image: "",
    },
  },
];
