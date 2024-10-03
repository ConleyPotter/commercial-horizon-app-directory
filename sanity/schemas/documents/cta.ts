import { defineField, defineType } from "sanity";

export default defineType({
    name: "cta",
    title: "Call To Action",
    type: "document",
    fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "ctaCopy", type: "string" }),
        defineField({ name: "link", type: "string" }),
        defineField({ name: "icon", type: "string" }),
    ],
    preview: {
        select: {
            title: "title",
        },
    },
});