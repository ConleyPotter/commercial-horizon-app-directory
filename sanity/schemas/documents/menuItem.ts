import { defineField, defineType } from "sanity";

export default defineType({
    name: "menuItem",
    title: "Menu Item",
    type: "document",
    fields: [
        defineField({ name: "name", type: "string" }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name",
            },
        }),
        defineField({
            name: 'menu',
            type: 'reference',
            to: [{ type: 'menu' }],
            // I want to use this to set the initial value to the 
            // menu that the menuItem is being created in
            // initialValue: () => 
        }),
        defineField({
            name: "type",
            type: "string",
            options: {
                list: [
                    { title: "Normal", value: "normal" },
                    { title: "CTA", value: "cta" },
                    { title: "Mega Menu", value: "megaMenu" },
                    { title: "Image", value: "image" },
                ],
            },
        }),
        defineField({ name: "image", type: "image", hidden: ({ document }) => document?.type !== "image" }),
        defineField({
            name: "ctaValues",
            type: "object",
            fields: [
                defineField({ name: "ctaCopy", type: "string" }),
                defineField({ name: "link", type: "string" }),
                defineField({ name: "button", type: "boolean" }),
                defineField({ name: "buttonText", type: "string" }),
                defineField({ name: "icon", type: "string" }),
            ],
            hidden: ({ document }) => document?.type !== "cta",
        }),
        defineField({
            name: "children",
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
                options: {
                    filter: "_type == $type && parent._ref == $id",
                    filterParams: { type: "menuItem", id: "_id" },
                },
            }],
            hidden: ({ document }) => document?.type !== "megaMenu",
        }),
        defineField({
            name: "featuredPosts",
            type: "array",
            of: [{
                type: "reference",
                to: [{ type: "post" }],
            }],
            hidden: ({ document }) => document?.type !== "megaMenu",
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: 'parent.title',
            slug: "slug.current",
            dropDown: "dropDown",
        },
        prepare: ({ title, subtitle }) => ({
            title,
            subtitle: subtitle ? `– ${subtitle}` : ``,
        }),
    },
});