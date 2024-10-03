import { defineField, defineType } from "sanity";

export default defineType({
    name: "menu",
    title: "Menu",
    type: "document",
    fields: [
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "items",
            type: "array",
            of: [{
                type: "reference",
                to: [{ 
                    type: "menuItem",
                    preview: {
                        select: {
                            title: "name",
                            slug: "slug.current",
                            dropDown: "dropDown",
                        },
                    },
                }],
            }],
        }),
    ],
});