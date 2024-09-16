import { defineField, defineType } from "sanity";

export const ctaType = defineType({
    name: "cta",
    title: "Call To Action",
    type: "document",
    fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "ctaCopy", type: "string" }),
        defineField({ name: "link", type: "string" }),
        defineField({ name: "button", type: "boolean" }),
        defineField({ 
            name: "buttonText", 
            type: "string",
            hidden: ({ document }) => !document?.button,
        }),
        defineField({
            name: "variant",
            type: "string",
            options: {
                list: ["primary", "secondary"],
            },
            hidden: ({ document }) => !document?.button,
        }),
        defineField({ name: "icon", type: "string" }),
    ],
    preview: {
        select: {
            title: "title",
        },
    },
});