import { DocumentTextIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default {
  name: "product",
  title: "Product",
  icon: DocumentTextIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "productCategory",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (rule) => rule.required(),
    }),
  ],
};
