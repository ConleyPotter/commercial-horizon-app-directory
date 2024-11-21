import { defineField, defineType } from "sanity";

export default defineType({
  name: "blank-page",
  title: "Blank Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule
          .required()
          .error("A slug is required to generate a page on the website."),
      hidden: ({ document }) => !document?.title,
    }),
    defineField({
      name: "featured_image",
      type: "image",
    }),
    defineField({
      name: "meta_data",
      type: "object",
      fields: [
        defineField({
          name: "meta_title",
          type: "string",
        }),
        defineField({
          name: "meta_description",
          type: "string",
        }),
        defineField({
          name: "open_graph_image",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "richTextBlock",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessiblity.",
              validation: (rule) => {
                return rule.custom((alt, context) => {
                  if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                    return "Required";
                  }
                  return true;
                });
              },
            }),
          ],
        }
      ],
    }),
  ],
});
