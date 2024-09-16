import { defineField, defineType } from 'sanity'

export const pageType = defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [
		{ name: 'details', title: 'Details' },
		{ name: 'editorial', title: 'Editorial' },
	],
	fields: [
		defineField({
			name: 'name',
			type: 'string',
			group: 'details',
		}),
		defineField({
			name: 'featured_image',
			type: 'image',
			group: 'editorial',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name',
			},
			validation: (rule) => rule
				.required()
				.error('A slug is required to generate a page on the website.'),
			hidden: ({ document }) => !document?.name,
			group: 'details',
		}),
		defineField({
			name: 'meta_data',
			type: 'object',
			fields: [
				defineField({
					name: 'meta_title',
					type: 'string',
					
				}),
				defineField({
					name: 'meta_description',
					type: 'string',
					
				}),
			],
			group: 'details',
		}),
		defineField({
            name: 'blocks',
            type: 'array',
            of: [{
                type: "reference",
                to: [{
                    type: 'contentBlock',
                    preview: {
                        select: {
                            title: 'title',
                            variant: 'variant',
                        }
                    }
                }]
            }],
			group: 'editorial',
        }),
	],
	preview: {
		select: {
		    title: 'name',
            slug: 'slug',
			media: 'featured_image',
		},
	},
})
