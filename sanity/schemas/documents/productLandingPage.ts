import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'product-landing-page',
    title: 'Product Landing Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title', 
            type: 'string'
        }),
        defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			validation: (rule) => rule
				.required()
				.error('A slug is required to generate a page on the website.'),
			hidden: ({ document }) => !document?.title,
		}),
        defineField({
            name: 'featured_image',
            type: 'image',
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
                defineField({
                    name: 'open_graph_image',
                    type: 'image',
                }),
            ],
        }),
        defineField({
            name: 'construction_features',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        // inside WordPress for Stoltzfus, there's a content sections repeater here
        defineField({
            name: 'gallery',
            type: 'object',
            title: 'Gallery',
            fields: [
                {
                    name: 'images',
                    type: 'array',
                    title: 'Images',
                    of: [
                        {
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative text',
                                },
                            ],
                        },
                    ],
                    options: {
                        layout: 'grid',
                    },
                },
                {
                    name: 'display',
                    type: 'string',
                    title: 'Display as',
                    description: 'How should we display these images?',
                    options: {
                        list: [
                            { title: 'Stacked on top of eachother', value: 'stacked' },
                            { title: 'In-line', value: 'inline' },
                            { title: 'Carousel', value: 'carousel' },
                        ],
                        layout: 'radio', // <-- defaults to 'dropdown'
                    },
                },
                {
                    name: 'zoom',
                    type: 'boolean',
                    title: 'Zoom enabled',
                    description: 'Should we enable zooming of images?',
                },
            ],
        }),
        defineField({
            name: 'design_center_url',
            type: 'url',
        }),
        defineField({
            name: 'virtual_tours',
            type: 'array',
            of: [{ 
                type: 'object',
                fields: [
                    defineField({ 
                        name: 'virtual_tour_title', 
                        type: 'string' 
                    }),
                    defineField({ 
                        name: 'virtual_tour_url', 
                        type: 'url' 
                    }),
                ],
            }],
        }),
        defineField({
            name: 'video',
            type: 'object',
            fields: [
                defineField({
                    name: 'url', 
                    type: 'url'
                }),
                defineField({
                    name: 'video_content', 
                    type: 'array',
                    of: [{ type: 'block' }],
                }),
            ],
        })
    ],
})